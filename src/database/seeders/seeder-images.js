import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const up = async () => {
    // Configuración de Supabase con las credenciales proporcionadas
    const supabaseUrl = 'https://ulgrkkcquytkafmoqwqt.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZ3Jra2NxdXl0a2FmbW9xd3F0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MTk4ODU0NSwiZXhwIjoyMDU3NTY0NTQ1fQ.HdL03Ksl-U36mX5xXTFJRPWcPO-f41bmJy7TjEyMxXs';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const nombreBucket = 'brujula-llanera';
    const rutaImages = path.join(__dirname, 'img/');

    // Función para subir una imagen, con soporte para WebP
    async function subirImagen(rutaArchivo, nombreArchivo) {
        try {
            const contenidoArchivo = await fs.readFile(rutaArchivo);
            const extension = path.extname(nombreArchivo).toLowerCase();
            let contentType;
            switch (extension) {
                case '.jpg':
                case '.jpeg':
                    contentType = 'image/jpeg';
                    break;
                case '.png':
                    contentType = 'image/png';
                    break;
                case '.webp':
                    contentType = 'image/webp';
                    break;
                default:
                    console.warn(`Formato no soportado, omitiendo: ${nombreArchivo}`);
                    return;
            }

            console.log(`Intentando subir ${nombreArchivo} a ${nombreBucket}/ejemplo/${nombreArchivo}`);
            const { error } = await supabase.storage
                .from(nombreBucket)
                .upload(`ejemplo/${nombreArchivo}`, contenidoArchivo, {
                    contentType: contentType,
                    cacheControl: '3600',
                    upsert: false,
                });

            if (error) {
                if (error.message.includes('Duplicate')) {
                    console.warn(`La imagen ${nombreArchivo} ya existe (upsert=false). Omitiendo.`);
                } else {
                    console.error(`Error al subir ${nombreArchivo}:`, error.message);
                    throw error;
                }
            } else {
                console.log(`Imagen ${nombreArchivo} subida con éxito.`);
            }
        } catch (readError) {
            console.error(`Error al leer el archivo ${rutaArchivo}:`, readError.message);
        }
    }

    try {
        console.log(`Leyendo archivos desde: ${rutaImages}`);
        const archivos = await fs.readdir(rutaImages);
        console.log(`Archivos encontrados: ${archivos.join(', ')}`);

        let archivosImagenProcesados = 0;
        for (const archivo of archivos) {
            if (archivo.toLowerCase().endsWith('.webp') || archivo.toLowerCase().endsWith('.jpg') || archivo.toLowerCase().endsWith('.png')) {
                const rutaCompleta = path.join(rutaImages, archivo);
                await subirImagen(rutaCompleta, archivo);
                archivosImagenProcesados++;
            } else {
                console.log(`Omitiendo archivo no deseado: ${archivo}`);
            }
        }
        console.log(`Proceso completado. ${archivosImagenProcesados} archivos de imagen procesados.`);
    } catch (error) {
        console.error('Error general en el proceso de siembra de imágenes:', error.message);
        throw error; // Lanzar el error para que Sequelize marque el seeder como fallido
    }
};

export const down = async () => {
    console.warn('El método down para seeder-images.js no elimina archivos de Supabase Storage.');
};