const { Client, Environment, ApiError } = require('square');
const client = require('@/app/helpers/apiAuth').default; 
const JsonBig = require('json-big');
const {randomUUID } = require('crypto');
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await client.catalogApi.listCatalog();
        // const resJson = JSON.stringify(response.result);
        const data = response.result.objects;
        const length = data.length;
        let returnObj = data.map(i => {
            let variations = i.itemData.variations.map(v => { return { id: v.id, isDeleted: v.isDeleted}})
            return { id: i.id, name: i.itemData.name, abbrev: i.itemData.abbreviation, variations }
        })
        return NextResponse.json(returnObj);
        // return NextResponse.json(JsonBig.jsonStringify(data));
        
      } catch(error) {
        console.log(error);
        return NextResponse.json({error:'snafu'})
      }
}

export async function POST(request) {
    const opts = await request.json()
//    const required = ['abbrev', 'name', 'varAbbrev', 'varName', 'varPrice']
    const uuid = randomUUID();
    
    try {
        const response = await client.catalogApi.upsertCatalogObject({
          idempotencyKey: uuid,
          object: {
            type: 'ITEM',
            id: '#' + opts.abbrev,
            itemData: {
              name: opts.name,
              abbreviation: opts.abbrev,
              variations: [
                {
                  type: 'ITEM_VARIATION',
                  id: '#' + opts.varAbbrev,
                  itemData: {
                    name: opts.name,
                    abbreviation: opts.varAbbrev,
                  },
                  itemVariationData: {
                    itemId: '#' + opts.abbrev,
                    name: opts.varName,
                    pricingType: 'FIXED_PRICING',
                    priceMoney: {
                      amount: opts.varPrice,
                      currency: 'USD'
                    }
                  }
                }
              ]
            }
          }
        });
      
        console.log(response.result);
        return NextResponse.json(JsonBig.jsonStringify(response.result))
      } catch(error) {
        console.log(error);
        return NextResponse.json(error)
      }
      
}

export async function DELETE (request) {
    const query = await request.json();
    console.log(query.object_ids)
    // return NextResponse.json({message: 'Gonna try to delete', content: response.object_ids})
    try {
        const response = await client.catalogApi.batchDeleteCatalogObjects({objectIds: query.object_ids
        });
        return NextResponse.json(response.body)
      } catch(error) {
        console.log(error);
        return NextResponse.json({error: error.body})
      }
}