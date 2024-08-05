const { Client, Environment, ApiError } = require('square');
const client = require('@/app/helpers/apiAuth').default; 
// const JsonBig = require('json-big');
// const {randomUUID } = require('crypto');
import { NextResponse } from 'next/server';
const {randomUUID } = require('crypto');
const dayjs = require('dayjs-with-plugins');
// var utc = require("dayjs/plugin/utc");

export async function GET() {
    try {
        const response = await client.inventoryApi.batchRetrieveInventoryCounts({});
        console.log(response.result);
        return NextResponse.json(response.result)
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: error.body})
    }
}

export async function PATCH(request) {
    // expects: catalogObjectId, quantity
    const {catalogObjectId, quantity} = await request.json();
    const uuid = randomUUID();
    
    // still to do:
    // calculate IN_STOCK or not
    const timestamp = dayjs().utc().format();
    try {
        const response = await client.inventoryApi.batchChangeInventory({
          idempotencyKey: uuid,
          changes: [
            {
              type: 'PHYSICAL_COUNT',
              physicalCount: {
                catalogObjectId: catalogObjectId,
                state: 'IN_STOCK',
                locationId: process.env.LOCATION_ID,
                quantity: quantity,
                occurredAt: timestamp
              }
            }
          ]
        });
      
        return NextResponse.json(response.result);
      } catch(error) {
        return NextResponse.json({error: error.body});
      }
      
}
