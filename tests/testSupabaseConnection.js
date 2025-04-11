import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ulgrkkcquytkafmoqwqt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZ3Jra2NxdXl0a2FmbW9xd3F0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MTk4ODU0NSwiZXhwIjoyMDU3NTY0NTQ1fQ.HdL03Ksl-U36mX5xXTFJRPWcPO-f41bmJy7TjEyMxXs'; // Reemplaza con la clave service_role
const supabase = createClient(supabaseUrl, supabaseKey);

(async () => {
    try {
        const { data, error } = await supabase.storage.listBuckets();
        if (error) {
            console.error('Error al listar buckets:', error.message);
        } else {
            console.log('Buckets disponibles:', data);
        }
    } catch (err) {
        console.error('Error al conectar con Supabase:', err.message);
    }
})();
