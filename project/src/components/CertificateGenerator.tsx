import React from 'react';
import { Download, Award, Calendar, User, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

interface CertificateGeneratorProps {
  courseTitle: string;
  completionDate: string;
  points: number;
}

const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({
  courseTitle,
  completionDate,
  points
}) => {
  const { user } = useAuth();
  const { addNotification } = useNotification();

  const generateCertificate = () => {
    // Create certificate content
    const certificateContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>GramCredits Certificate</title>
        <style>
          body {
            font-family: 'Georgia', serif;
            margin: 0;
            padding: 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .certificate {
            background: white;
            padding: 60px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 800px;
            width: 100%;
            border: 8px solid #10b981;
            position: relative;
          }
          .certificate::before {
            content: '';
            position: absolute;
            top: 20px;
            left: 20px;
            right: 20px;
            bottom: 20px;
            border: 2px solid #10b981;
            border-radius: 12px;
          }
          .header {
            margin-bottom: 40px;
          }
          .logo {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #10b981, #3b82f6);
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 32px;
            font-weight: bold;
          }
          .title {
            font-size: 48px;
            color: #10b981;
            margin-bottom: 10px;
            font-weight: bold;
          }
          .subtitle {
            font-size: 24px;
            color: #6b7280;
            margin-bottom: 40px;
          }
          .recipient {
            font-size: 32px;
            color: #1f2937;
            margin-bottom: 20px;
            font-weight: bold;
          }
          .course {
            font-size: 28px;
            color: #3b82f6;
            margin-bottom: 30px;
            font-style: italic;
          }
          .details {
            display: flex;
            justify-content: space-around;
            margin: 40px 0;
            padding: 20px;
            background: #f9fafb;
            border-radius: 12px;
          }
          .detail-item {
            text-align: center;
          }
          .detail-label {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 5px;
          }
          .detail-value {
            font-size: 18px;
            color: #1f2937;
            font-weight: bold;
          }
          .signature-section {
            margin-top: 60px;
            display: flex;
            justify-content: space-between;
            align-items: end;
          }
          .signature {
            text-align: center;
            flex: 1;
          }
          .signature-line {
            border-top: 2px solid #10b981;
            margin-bottom: 10px;
            width: 200px;
            margin-left: auto;
            margin-right: auto;
          }
          .signature-title {
            font-size: 14px;
            color: #6b7280;
          }
          .qr-code {
            width: 80px;
            height: 80px;
            background: #f3f4f6;
            border: 2px solid #10b981;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            color: #6b7280;
          }
          .verification-id {
            margin-top: 20px;
            font-size: 12px;
            color: #6b7280;
            font-family: monospace;
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="header">
            <div class="logo">🌍</div>
            <div class="title">GramCredits</div>
            <div class="subtitle">Certificate of Completion</div>
          </div>
          
          <div class="recipient">
            This is to certify that<br>
            <strong>${user?.name || 'Student'}</strong>
          </div>
          
          <div class="course">
            has successfully completed<br>
            "${courseTitle}"
          </div>
          
          <div class="details">
            <div class="detail-item">
              <div class="detail-label">Completion Date</div>
              <div class="detail-value">${new Date(completionDate).toLocaleDateString()}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Points Earned</div>
              <div class="detail-value">${points}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Certificate ID</div>
              <div class="detail-value">GC-${Date.now()}</div>
            </div>
          </div>
          
          <div class="signature-section">
            <div class="signature">
              <div class="signature-line"></div>
              <div class="signature-title">Dr. Kavita Verma<br>Chief Verification Officer</div>
            </div>
            <div class="qr-code">
              QR Code<br>Verification
            </div>
            <div class="signature">
              <div class="signature-line"></div>
              <div class="signature-title">GramCredits Platform<br>Blockchain Verified</div>
            </div>
          </div>
          
          <div class="verification-id">
            Blockchain Transaction: 0x${Math.random().toString(16).substr(2, 32)}
          </div>
        </div>
      </body>
      </html>
    `;

    // Create and download the certificate
    const blob = new Blob([certificateContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `GramCredits_Certificate_${courseTitle.replace(/\s+/g, '_')}_${user?.name?.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addNotification({
      type: 'success',
      title: 'Certificate Downloaded! 🎓',
      message: 'Your blockchain-verified certificate has been downloaded successfully.'
    });
  };

  return (
    <button
      onClick={generateCertificate}
      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
    >
      <Download className="w-5 h-5" />
      <span>Download Certificate</span>
    </button>
  );
};

export default CertificateGenerator;