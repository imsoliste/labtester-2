export interface Lab {
  id: string;
  name: string;
  address: string;
  city: string;
  rating: number;
  accredited: boolean;
}

export interface Test {
  id: string;
  name: string;
  description: string;
  category: string;
  parameters: string[];
  preparation_instructions: string;
  report_time_hours: number;
}

export interface LabTestPrice {
  id: string;
  lab_id: string;
  test_id: string;
  price: number;
  home_collection_available: boolean;
  home_collection_fee: number;
  lab?: Lab;
  test?: Test;
}