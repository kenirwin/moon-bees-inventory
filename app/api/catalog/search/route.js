const { Client, Environment, ApiError } = require('square');
const client = require('@/app/helpers/apiAuth').default; 
const JsonBig = require('json-big');
const {randomUUID } = require('crypto');
import { NextResponse } from 'next/server';


export async function GET(request){
    console.log('raw' + request.nextUrl.searchParams['q'])
    let query = '';
    if (request.nextUrl.searchParams.has('q')) {
        query = request.nextUrl.searchParams.get('q');
        console.log('setting query parameter to' + query)
    } else {
        console.log('no query param received')
        console.log(typeof request.nextUrl.searchParams)
    }

    try {
        const response = await client.catalogApi.searchCatalogItems({
        textFilter: query
        });

        // let firstItem = response.result.items[0].itemData;
        let itemArray = response.result.items.map(item => {
            return {
                type: item.type,
                id: item.id,
                name: item.itemData.name,
                varType: item.itemData.variations[0].type,
                varId: item.itemData.variations[0].id
            }
        })
        console.log(itemArray)
        return NextResponse.json(itemArray);
    } catch(error) {
        return NextResponse.json(JSON.stringify(error));
    }
}
