import {customFetch} from './index';

export const get123Brands = ()=> customFetch(`${process.env.REACT_APP_API}/get123Brands`, 'GET');
export const get123Years = (brand_id)=> customFetch(`${process.env.REACT_APP_API}/get123Years/${brand_id}`, 'GET');
export const get123Family = (brand_id,year)=> customFetch(`${process.env.REACT_APP_API}/get123Family/${brand_id}/${year}`, 'GET');
export const get123Models = (brand_id,year,family_id)=> customFetch(`${process.env.REACT_APP_API}/get123Models/${brand_id}/${year}/${family_id}`, 'GET');
export const get123Provinces = ()=> customFetch(`${process.env.REACT_APP_API}/get123Provinces`, 'GET');
