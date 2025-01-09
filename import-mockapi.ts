import { createClient } from '@sanity/client';
import fetch from 'node-fetch';



// Initialize Sanity client
const sanityClient = createClient({
  projectId: '1kifk5u3', // Replace with your project ID
  dataset: 'production',      // Replace with your dataset
  useCdn: false,
  apiVersion: '2023-01-01',
  token: 'skqdoSAfJBBnLs0ZnleZgnAGkTOGtVGubfyINQXryb2aHyj7lIp0lt86dcdZdtv6g7l3y27Gclh6RpqLWCSySw8cv82gRUxOXMGBg5YvGrWeaPQXABHs1cZaUj4tmJDzmnjOPyTk0brRbZ514Z2IcG1a2IXboZ1RMyOSEmH7dEWBTahBO2xh', // Replace with your Sanity token
});

// MockAPI URL
const mockApiUrl = 'https://677d6be14496848554ca92d5.mockapi.io/furniture/api/furniture';

// Define the FurnitureItem interface to match the MockAPI data structure
interface FurnitureItem {
  id: string;
  createdAt: string;
  name: string;
  price: number;
  image: string; // Assuming the image is a URL string
}

// Import data function
async function importData() {
  try {
    console.log('Fetching data from MockAPI...');
    const response = await fetch(mockApiUrl);

    // Ensure the response is successful
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    // Parse the response JSON and cast it to FurnitureItem[]
    const furnitureItems = (await response.json()) as FurnitureItem[];

    console.log(`Fetched ${furnitureItems.length} items from MockAPI.`);

    // Loop through each item and create a document in Sanity
    for (const item of furnitureItems) {
      const doc = {
        _type: 'furniture',
        id: item.id,
        createdAt: item.createdAt,
        name: item.name,
        price: item.price,
        image: {
          _type: 'image',
          asset: {
            _ref: item.image, // Assumes the image is a URL. You may need to handle uploads separately.
          },
        },
      };

      // Create the document in Sanity
      await sanityClient.create(doc);
      console.log(`Imported: ${item.name}`);
    }

    console.log('All data imported successfully!');
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

// Call the importData function
importData();