import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { Download, Link as LinkIcon } from 'lucide-react';

interface QRGeneratorProps {
    defaultUrl?: string;
}

const QRGenerator: React.FC<QRGeneratorProps> = ({ defaultUrl = '' }) => {
    const [url, setUrl] = React.useState(defaultUrl);
    const qrRef = useRef<HTMLDivElement>(null);

    const handleDownloadQR = () => {
        if (!qrRef.current) return;

        // Find the canvas element inside the ref
        const canvas = qrRef.current.querySelector('canvas');
        if (canvas) {
            const pngUrl = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = 'menu-qr-code.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
                QR Code Generator
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
                Enter the URL of your deployed menu to generate a QR code.
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <LinkIcon size={20} style={{ marginRight: 8, color: '#64748b' }} />
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Menu URL"
                    size="small"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://your-menu-url.com"
                />
            </Box>

            <Box
                ref={qrRef}
                sx={{
                    mb: 3,
                    p: 2,
                    bgcolor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: 2,
                    display: 'inline-block'
                }}
            >
                {url ? (
                    <QRCodeCanvas
                        value={url}
                        size={200}
                        level={"H"}
                        includeMargin={true}
                        imageSettings={{
                            src: "", // You can add a logo here if needed
                            x: undefined,
                            y: undefined,
                            height: 24,
                            width: 24,
                            excavate: true,
                        }}
                    />
                ) : (
                    <Box sx={{ width: 200, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f1f5f9' }}>
                        <Typography variant="caption" color="text.secondary">Enter URL to generate</Typography>
                    </Box>
                )}
            </Box>

            <Button
                variant="contained"
                color="primary"
                startIcon={<Download size={18} />}
                onClick={handleDownloadQR}
                disabled={!url}
                fullWidth
            >
                Download QR Code
            </Button>
        </Paper>
    );
};

export default QRGenerator;
