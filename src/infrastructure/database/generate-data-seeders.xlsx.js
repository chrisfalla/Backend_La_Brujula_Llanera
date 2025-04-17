// Script para documentar TODOS los registros de TODOS los seeders en data-seeders.xlsx
import fs from 'fs';
import path from 'path';
import xlsx from 'xlsx';

// Importante: ¡Este script fue generado automáticamente! Modifica según tus necesidades.

// TODOS los datos de TODOS los seeders (extraídos de los archivos JS)
const data = [];

// --- Categorías ---
[
  { name: 'Ecoturismo' },
  { name: 'Cultura' },
  { name: 'Gastronomía' },
  { name: 'Servicios' },
  { name: 'Alojamiento' },
  { name: 'Entretenimiento' }
].forEach((row, idx) => {
  data.push({
    Seeder: '20250413000001-seed-categorie.js',
    Entidad: 'Categorie',
    'Campo/Columna': 'name',
    Valor: row.name,
    Descripción: 'Categoría principal',
    Index: idx + 1
  });
});

// --- Tags ---
[
  'Naturaleza', 'Cultura', 'Senderismo', 'Eventos', 'Religioso',
  'Museos', 'Compras', 'Restaurante', 'Bar', 'Discoteca',
  'Café', 'Gastronomía', 'Hotel', 'Piscina', 'Camping',
  'Alojamiento', 'Turismo', 'Parque', 'Centro Comercial', 'Supermercados'
].forEach((name, idx) => {
  data.push({
    Seeder: '20250413000002-seed-tag.js',
    Entidad: 'Tag',
    'Campo/Columna': 'name',
    Valor: name,
    Descripción: 'Tag',
    Index: idx + 1
  });
});

// --- Lugares (Places) ---
const places = [
  {
    name: 'Parque El Resurgimiento',
    description: 'El parque principal de Yopal, ideal para eventos y actividades al aire libre.',
    phoneNumber: null,
    idCategorie: 1 // Ecoturismo
  },
  {
    name: 'Catedral San José',
    description: 'La catedral más importante de Yopal, ubicada en el centro de la ciudad.',
    phoneNumber: null,
    idCategorie: 2 // Cultura
  },
  {
    name: 'Centro Comercial Unicentro Yopal',
    description: 'Centro comercial con tiendas, restaurantes y entretenimiento.',
    phoneNumber: '+57 8 634 0000',
    idCategorie: 6 // Entretenimiento
  },
  {
    name: 'Restaurante El Llanero Real',
    description: 'Restaurante típico llanero con la mejor carne a la llanera.',
    phoneNumber: '+57 8 634 1111',
    idCategorie: 3 // Gastronomía
  },
  {
    name: 'Hotel Estelar Yopal',
    description: 'Hotel moderno con todas las comodidades para tu estadía en Yopal.',
    phoneNumber: '+57 8 634 2222',
    idCategorie: 5 // Alojamiento
  }
];
places.forEach((row, idx) => {
  Object.keys(row).forEach((col) => {
    data.push({
      Seeder: '20250413000008-seed-place.js',
      Entidad: 'Place',
      'Campo/Columna': col,
      Valor: row[col],
      Descripción: `Registro de Place #${idx + 1}`,
      Index: idx + 1
    });
  });
});

// --- Direcciones (Addresses) ---
const addresses = [
  { latitud: 5.3496, longintude: -72.4105, description: 'Parque El Resurgimiento, Calle 24 # 21-40, Yopal' },
  { latitud: 5.3372, longintude: -72.3954, description: 'Catedral San José, Calle 9 # 21-50, Yopal' },
  { latitud: 5.3377, longintude: -72.3976, description: 'Unicentro Yopal, Carrera 29 # 15-50, Yopal' },
  { latitud: 5.3379, longintude: -72.3971, description: 'Restaurante El Llanero Real, Calle 10 # 23-30, Yopal' },
  { latitud: 5.3371, longintude: -72.3957, description: 'Hotel Estelar Yopal, Carrera 21 # 9-18, Yopal' }
];
addresses.forEach((row, idx) => {
  Object.keys(row).forEach((col) => {
    data.push({
      Seeder: '20250413000005-seed-address.js',
      Entidad: 'Address',
      'Campo/Columna': col,
      Valor: row[col],
      Descripción: `Dirección #${idx + 1}`,
      Index: idx + 1
    });
  });
});

// --- AddressByPlace ---
const addressByPlace = [
  { idPlaceFk: 1, idAddressFk: 1 }, // Parque El Resurgimiento
  { idPlaceFk: 2, idAddressFk: 2 }, // Catedral San José
  { idPlaceFk: 3, idAddressFk: 3 }, // Centro Comercial Unicentro
  { idPlaceFk: 4, idAddressFk: 4 }, // Restaurante El Llanero Real
  { idPlaceFk: 5, idAddressFk: 5 }  // Hotel Estelar Yopal
];
addressByPlace.forEach((row, idx) => {
  Object.keys(row).forEach((col) => {
    data.push({
      Seeder: '20250413000009-seed-addressbyplace.js',
      Entidad: 'AddressByPlace',
      'Campo/Columna': col,
      Valor: row[col],
      Descripción: `Relación AddressByPlace #${idx + 1}`,
      Index: idx + 1
    });
  });
});

// --- TagByPlace ---
const tagByPlace = [
  // Parque El Resurgimiento - Naturaleza, Parque
  { idPlaceFk: 1, idTagFk: 1 },
  { idPlaceFk: 1, idTagFk: 18 },
  
  // Catedral San José - Religioso, Cultura
  { idPlaceFk: 2, idTagFk: 5 },
  { idPlaceFk: 2, idTagFk: 2 },
  
  // Centro Comercial Unicentro Yopal - Centro Comercial, Compras
  { idPlaceFk: 3, idTagFk: 19 },
  { idPlaceFk: 3, idTagFk: 7 },
  
  // Restaurante El Llanero Real - Restaurante, Gastronomía
  { idPlaceFk: 4, idTagFk: 8 },
  { idPlaceFk: 4, idTagFk: 12 },
  
  // Hotel Estelar Yopal - Hotel, Alojamiento
  { idPlaceFk: 5, idTagFk: 13 },
  { idPlaceFk: 5, idTagFk: 16 }
];
tagByPlace.forEach((row, idx) => {
  Object.keys(row).forEach((col) => {
    data.push({
      Seeder: '20250413000010-seed-tagbyplace.js',
      Entidad: 'TagByPlace',
      'Campo/Columna': col,
      Valor: row[col],
      Descripción: `Relación TagByPlace #${idx + 1}`,
      Index: idx + 1
    });
  });
});

// --- Reviews ---
const reviews = [
  { comment: 'Un parque hermoso y muy bien cuidado. Ideal para pasear en familia.', ratingValue: 5, idPlaceFk: 1, idUserFk: 1, dateTime: '2025-04-01T14:30:00' },
  { comment: 'Excelente lugar para hacer ejercicio y disfrutar del aire libre.', ratingValue: 4, idPlaceFk: 1, idUserFk: 2, dateTime: '2025-04-02T19:15:00' },
  { comment: 'La catedral es impresionante, un lugar de paz y recogimiento.', ratingValue: 5, idPlaceFk: 2, idUserFk: 1, dateTime: '2025-04-03T10:45:00' },
  { comment: 'Hermosa arquitectura y ambiente muy tranquilo.', ratingValue: 5, idPlaceFk: 2, idUserFk: 2, dateTime: '2025-04-04T16:20:00' },
  { comment: 'El centro comercial tiene de todo, muy completo y moderno.', ratingValue: 4, idPlaceFk: 3, idUserFk: 1, dateTime: '2025-04-05T11:10:00' },
  { comment: 'Buen lugar para compras, aunque los fines de semana estu00e1 muy lleno.', ratingValue: 4, idPlaceFk: 3, idUserFk: 2, dateTime: '2025-04-06T09:30:00' },
  { comment: 'La mejor carne a la llanera de Yopal, sabor autu00e9ntico.', ratingValue: 5, idPlaceFk: 4, idUserFk: 1, dateTime: '2025-04-07T20:45:00' },
  { comment: 'Excelente servicio y comida deliciosa. Precios razonables.', ratingValue: 5, idPlaceFk: 4, idUserFk: 2, dateTime: '2025-04-08T08:15:00' },
  { comment: 'Hotel con excelentes instalaciones y personal muy amable.', ratingValue: 5, idPlaceFk: 5, idUserFk: 1, dateTime: '2025-04-09T13:30:00' },
  { comment: 'Habitaciones cu00f3modas y limpias. El desayuno buffet es muy completo.', ratingValue: 4, idPlaceFk: 5, idUserFk: 2, dateTime: '2025-04-10T19:45:00' }
];
reviews.forEach((row, idx) => {
  Object.keys(row).forEach((col) => {
    data.push({
      Seeder: '20250413000011-seed-review.js',
      Entidad: 'Review',
      'Campo/Columna': col,
      Valor: row[col],
      Descripción: `Review #${idx + 1}`,
      Index: idx + 1
    });
  });
});

// --- LogVisit ---
const logVisits = [
  { deviceDateTime: '2025-04-01T10:15:00', idDeviceInfoFk: 1, idPlaceFk: 1, idUserFk: 1 }, // Parque El Resurgimiento
  { deviceDateTime: '2025-04-02T14:30:00', idDeviceInfoFk: 2, idPlaceFk: 2, idUserFk: 2 }, // Catedral San José
  { deviceDateTime: '2025-04-03T09:45:00', idDeviceInfoFk: 3, idPlaceFk: 3, idUserFk: 1 }, // Centro Comercial Unicentro
  { deviceDateTime: '2025-04-04T16:20:00', idDeviceInfoFk: 4, idPlaceFk: 4, idUserFk: 2 }, // Restaurante El Llanero Real
  { deviceDateTime: '2025-04-05T11:10:00', idDeviceInfoFk: 5, idPlaceFk: 5, idUserFk: null }, // Hotel Estelar Yopal
  { deviceDateTime: '2025-04-06T19:30:00', idDeviceInfoFk: 1, idPlaceFk: 1, idUserFk: 2 }, // Parque El Resurgimiento
  { deviceDateTime: '2025-04-07T12:45:00', idDeviceInfoFk: 2, idPlaceFk: 2, idUserFk: 1 }, // Catedral San José
  { deviceDateTime: '2025-04-08T15:15:00', idDeviceInfoFk: 3, idPlaceFk: 3, idUserFk: null }, // Centro Comercial Unicentro
  { deviceDateTime: '2025-04-09T10:30:00', idDeviceInfoFk: 4, idPlaceFk: 4, idUserFk: 2 }, // Restaurante El Llanero Real
  { deviceDateTime: '2025-04-10T13:45:00', idDeviceInfoFk: 5, idPlaceFk: 5, idUserFk: 1 } // Hotel Estelar Yopal
];
logVisits.forEach((row, idx) => {
  Object.keys(row).forEach((col) => {
    data.push({
      Seeder: '20250413000012-seed-logvisit.js',
      Entidad: 'LogVisit',
      'Campo/Columna': col,
      Valor: row[col],
      Descripción: `LogVisit #${idx + 1}`,
      Index: idx + 1
    });
  });
});

// --- ImageByPlace ---
const images = [
  { urlImage: 'https://images.unsplash.com/photo-1586500036706-41963de24d8b', idImageCategorieFk: 1, idPlaceFk: 1 }, // Parque El Resurgimiento
  { urlImage: 'https://images.unsplash.com/photo-1552083375-1447ce886485', idImageCategorieFk: 2, idPlaceFk: 1 }, // Parque El Resurgimiento
  { urlImage: 'https://images.unsplash.com/photo-1544919982-b61982e3c3d8', idImageCategorieFk: 1, idPlaceFk: 2 }, // Catedral San José
  { urlImage: 'https://images.unsplash.com/photo-1530076886461-ce58ea8abe24', idImageCategorieFk: 2, idPlaceFk: 2 }, // Catedral San José
  { urlImage: 'https://images.unsplash.com/photo-1581417478175-a9ef18f210c2', idImageCategorieFk: 1, idPlaceFk: 3 }, // Centro Comercial Unicentro
  { urlImage: 'https://images.unsplash.com/photo-1567958451986-2de427a4a0be', idImageCategorieFk: 2, idPlaceFk: 3 }, // Centro Comercial Unicentro
  { urlImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5', idImageCategorieFk: 1, idPlaceFk: 4 }, // Restaurante El Llanero Real
  { urlImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0', idImageCategorieFk: 3, idPlaceFk: 4 }, // Restaurante El Llanero Real
  { urlImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945', idImageCategorieFk: 1, idPlaceFk: 5 }, // Hotel Estelar Yopal
  { urlImage: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa', idImageCategorieFk: 4, idPlaceFk: 5 } // Hotel Estelar Yopal
];
images.forEach((row, idx) => {
  Object.keys(row).forEach((col) => {
    data.push({
      Seeder: '20250413000013-seed-imagebyplace.js',
      Entidad: 'ImageByPlace',
      'Campo/Columna': col,
      Valor: row[col],
      Descripción: `Imagen #${idx + 1}`,
      Index: idx + 1
    });
  });
});

// --- Escritura Excel ---
const worksheet = xlsx.utils.json_to_sheet(data);
const workbook = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(workbook, worksheet, 'Seeders');
const outPath = path.resolve('./data-seeders.xlsx');
xlsx.writeFile(workbook, outPath);
console.log('Archivo data-seeders.xlsx generado con TODOS los registros de los seeders.');
