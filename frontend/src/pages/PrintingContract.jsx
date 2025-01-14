import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import useOrderStore from '../store/orderStore';

const OrderDetails = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const { getOrderById } = useOrderStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await getOrderById(id);
        setOrderDetails(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id, getOrderById]);

  async function generateOrderDetailsPDF(orderDetails) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.276, 841.890]); // A4 size
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const drawText = (text, x, y, { font: usedFont = font, size = 10, color = rgb(0, 0, 0) } = {}) => {
      page.drawText(text, {
        x,
        y: height - y,
        size,
        font: usedFont,
        color,
      });
    };

    const drawLine = (x1, y1, x2, y2) => {
      page.drawLine({
        start: { x: x1, y: height - y1 },
        end: { x: x2, y: height - y2 },
        thickness: 1,
        color: rgb(0, 0, 0),
      });
    };

    const drawTable = (headers, rows, startY) => {
      const cellPadding = 5;
      const lineHeight = 20;
      let y = startY;

      // Draw headers
      headers.forEach((header, index) => {
        const x = 50 + (index * (width - 100) / headers.length);
        drawText(header, x, y, { usedFont: boldFont, size: 10 });
      });
      y += lineHeight;
      drawLine(50, y, width - 50, y);

      // Draw rows
      rows.forEach(row => {
        y += lineHeight;
        row.forEach((cell, index) => {
          const x = 50 + (index * (width - 100) / headers.length);
          drawText(cell, x, y, { size: 9 });
        });
        drawLine(50, y + lineHeight, width - 50, y + lineHeight);
      });

      return y + lineHeight;
    };

    // Header
    drawText('ORDER DETAILS', 50, 50, { usedFont: boldFont, size: 16 });
    drawText(`Order ID: ${orderDetails._id}`, 50, 80, { size: 10 });
    drawText(`Date: ${new Date(orderDetails.createdAt).toLocaleDateString()}`, 400, 80, { size: 10 });

    // Customer Information
    drawText('Customer Information', 50, 110, { usedFont: boldFont, size: 12 });
    let y = drawTable(
      ['Name', 'Email', 'Type'],
      [[orderDetails.user.fullName, orderDetails.user.email, orderDetails.user.type]],
      130
    );

    // Transport Information
    y += 20;
    drawText('Transport Information', 50, y, { usedFont: boldFont, size: 12 });
    y = drawTable(
      ['Transport Name', 'Vehicle Number', 'Vehicle Name', 'Capacity'],
      [[
        orderDetails.transport.transportName,
        orderDetails.vechile.vehicleNumber,
        orderDetails.vechile.vehicleName,
        `${orderDetails.vechile.capacity} kg`
      ]],
      y + 20
    );

    // Field and Crop Information
    y += 20;
    drawText('Field and Crop Information', 50, y, { usedFont: boldFont, size: 12 });
    y = drawTable(
      ['Field Name', 'Location', 'Size', 'Soil Type', 'Crop', 'Variety'],
      [[
        orderDetails.feildId.feildName,
        orderDetails.feildId.location,
        `${orderDetails.feildId.size} acres`,
        orderDetails.feildId.soilType,
        orderDetails.crop.cropName,
        orderDetails.crop.variety
      ]],
      y + 20
    );

    // Order Details
    y += 20;
    drawText('Order Details', 50, y, { usedFont: boldFont, size: 12 });
    y = drawTable(
      ['Quantity', 'Price', 'Destination', 'Distance', 'Status'],
      [[
        `${orderDetails.quantity} kg`,
        `Rs. ${orderDetails.price.toFixed(2)}`,
        orderDetails.location,
        `${orderDetails.distance} km`,
        orderDetails.status
      ]],
      y + 20
    );

    // Footer
    drawText('This is a computer-generated document. No signature is required.', 50, height - 50, { size: 8 });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `Order_${id}.pdf`;
    link.click();
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  if (!orderDetails) {
    return <div className="text-center p-4">No order details found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-2xl mx-auto">
        <div className="bg-gray-100 p-4 border-b">
          <h1 className="text-2xl font-bold text-center text-gray-800">Order Details</h1>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="font-semibold text-gray-700">Transporter Vehicle:</div>
            <div>{orderDetails.transport.transportName}</div>
            <div className="font-semibold text-gray-700">Field:</div>
            <div>{orderDetails.feildId.feildName}</div>
            <div className="font-semibold text-gray-700">Crop:</div>
            <div>{orderDetails.crop.cropName}</div>
            <div className="font-semibold text-gray-700">Destination:</div>
            <div>{orderDetails.location}</div>
            <div className="font-semibold text-gray-700">Quantity:</div>
            <div>{orderDetails.quantity}</div>
            <div className="font-semibold text-gray-700">Distance:</div>
            <div>{orderDetails.distance}</div>
            <div className="font-semibold text-gray-700">Price:</div>
            <div>₹{orderDetails.price.toFixed(2)}</div>
            <div className="font-semibold text-gray-700">Status:</div>
            <div>{orderDetails.status}</div>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => generateOrderDetailsPDF(orderDetails)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
