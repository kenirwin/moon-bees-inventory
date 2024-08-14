const { Client, Environment, ApiError } = require('square');
const client = require('@/app/helpers/apiAuth').default; 
import { NextResponse } from 'next/server';
const {randomUUID } = require('crypto');
const dayjs = require('dayjs-with-plugins');

// transfer stock from one item to another
export async function POST (request) {
    // expect fromCatalogId, toCatalogId, newFromQty, newToQty
    try {
        const timestamp = dayjs().utc().format();
        const {fromCatalogId, toCatalogId, newFromQty, newToQty} = await request.json();
        const response = await client.inventoryApi.batchChangeInventory({
          idempotencyKey: randomUUID(),
          changes: [
            {
              type: 'PHYSICAL_COUNT',
              physicalCount: {
                catalogObjectId: fromCatalogId,
                state: 'IN_STOCK',
                locationId: process.env.LOCATION_ID,
                quantity: newFromQty,
                occurredAt: timestamp
              }
            },
            {
              type: 'PHYSICAL_COUNT',
              physicalCount: {
                catalogObjectId: toCatalogId,
                state: 'IN_STOCK',
                locationId: process.env.LOCATION_ID,
                quantity: newToQty,
                occurredAt: timestamp
              }
            }
          ]
        });
      
        console.log(response.result);
        return NextResponse.json(response.result);
      } catch(error) {
        console.log(error);
        return NextResponse.json(error.body)
      }
}