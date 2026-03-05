import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Box, Button, TextField, Typography, Paper, alpha } from '@mui/material';
import {
    FileDownload as DownloadIcon,
    Link as LinkIcon
} from '@mui/icons-material';

interface QRGeneratorProps {
    defaultUrl?: string;
}

const QRGenerator: React.FC<QRGeneratorProps> = ({ defaultUrl = '' }) => {
    const [url, setUrl] = React.useState(defaultUrl);
    const qrRef = useRef<HTMLDivElement>(null);

    const handleDownloadQR = () => {
        if (!qrRef.current) return;

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
        <Paper
            sx={{
                p: 4,
                textAlign: 'center',
                background: 'transparent',
                boxShadow: 'none'
            }}
        >
            <Typography variant="h5" gutterBottom fontWeight={900} color="primary">
                GENERADOR QR
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={4}>
                Escanea o descarga el código para acceder al menú desde cualquier dispositivo.
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 1 }}>
                <LinkIcon color="primary" />
                <TextField
                    fullWidth
                    variant="outlined"
                    label="URL del Menú"
                    size="small"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://tu-menu.vercel.app"
                />
            </Box>

            <Box
                ref={qrRef}
                sx={{
                    mb: 4,
                    p: 3,
                    bgcolor: 'white',
                    borderRadius: 4,
                    display: 'inline-block',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    border: '4px solid',
                    borderColor: alpha('#D4AF37', 0.2)
                }}
            >
                {url ? (
                    <QRCodeCanvas
                        value={url}
                        size={220}
                        level={"H"}
                        includeMargin={true}
                    />
                ) : (
                    <Box sx={{ width: 220, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f1f5f9' }}>
                        <Typography variant="caption" color="text.secondary">Ingresa una URL</Typography>
                    </Box>
                )}
            </Box>

            <Button
                variant="contained"
                color="primary"
                startIcon={<DownloadIcon />}
                onClick={handleDownloadQR}
                disabled={!url}
                fullWidth
                sx={{
                    py: 1.5,
                    fontWeight: 800,
                    borderRadius: 3
                }}
            >
                DESCARGAR QR
            </Button>
        </Paper>
    );
};

export default QRGenerator;
