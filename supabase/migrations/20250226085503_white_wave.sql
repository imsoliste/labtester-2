/*
  # Create tables for lab tests and pricing

  1. New Tables
    - `labs`
      - Basic information about diagnostic labs
    - `tests`
      - Available medical tests
    - `lab_test_prices`
      - Pricing for tests at different labs
    
  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
*/

CREATE TABLE IF NOT EXISTS labs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  rating decimal(2,1) DEFAULT 0.0,
  accredited boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text NOT NULL,
  parameters text[] DEFAULT '{}',
  preparation_instructions text,
  report_time_hours int DEFAULT 24,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS lab_test_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lab_id uuid REFERENCES labs(id),
  test_id uuid REFERENCES tests(id),
  price decimal(10,2) NOT NULL,
  home_collection_available boolean DEFAULT true,
  home_collection_fee decimal(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE labs ENABLE ROW LEVEL SECURITY;
ALTER TABLE tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_test_prices ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON labs
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access" ON tests
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access" ON lab_test_prices
  FOR SELECT TO public USING (true);

-- Insert sample data
INSERT INTO labs (name, address, city, rating, accredited) VALUES
  ('HealthLabs', '123 Medical Street', 'Mumbai', 4.5, true),
  ('DiagnosticPro', '456 Health Avenue', 'Mumbai', 4.2, true),
  ('CityLab', '789 Care Road', 'Mumbai', 4.0, true);

INSERT INTO tests (name, description, category, parameters, preparation_instructions, report_time_hours) VALUES
  (
    'Complete Blood Count',
    'Basic blood test that evaluates overall health',
    'Hematology',
    ARRAY['RBC', 'WBC', 'Hemoglobin', 'Platelets', 'Hematocrit'],
    'Fasting for 8-10 hours recommended',
    24
  ),
  (
    'Lipid Profile',
    'Measures different types of cholesterol',
    'Biochemistry',
    ARRAY['Total Cholesterol', 'HDL', 'LDL', 'Triglycerides'],
    'Fasting for 12 hours required',
    24
  ),
  (
    'Thyroid Profile',
    'Evaluates thyroid function',
    'Endocrinology',
    ARRAY['T3', 'T4', 'TSH'],
    'No special preparation required',
    48
  );

INSERT INTO lab_test_prices (lab_id, test_id, price, home_collection_fee) 
SELECT 
  l.id,
  t.id,
  (random() * 500 + 300)::decimal(10,2),
  100
FROM labs l
CROSS JOIN tests t;