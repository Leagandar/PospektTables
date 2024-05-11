import deformation_response from '../mocs/deformation_response.json';
import deformation_trend_response from '../mocs/deformation_trend_response.json';
import termo_response from '../mocs/termo_response.json';
import termo_trend_response from '../mocs/termo_trend_response.json';
import type { DeformationResponse, DeformationTrendResponse, TermoDataResponse, TermoTrendResponse } from '../types';

type Measurement = DeformationResponse | DeformationTrendResponse | TermoDataResponse | TermoTrendResponse;

const data = {
    deformation_response,
    deformation_trend_response,
    termo_response,
    termo_trend_response,
}

type URL = keyof typeof data;

const fetchMeasurements = async (url: URL): Promise<Measurement> => {
    try {
        return new Promise((resolve) => {
            setTimeout(() => resolve(data[url]), 1000)
        })
    } catch (err: any) {
        throw new Error(err.message ?? data)
    }
}


export { fetchMeasurements, type Measurement }