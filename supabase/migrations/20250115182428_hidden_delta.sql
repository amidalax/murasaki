/*
  # Initial Schema Setup for Cybersecurity Platform

  1. New Tables
    - `roles`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `created_at` (timestamp)
    
    - `user_roles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `role_id` (uuid, references roles)
      - `created_at` (timestamp)
    
    - `projects`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `created_by` (uuid, references auth.users)
      - `created_at` (timestamp)
    
    - `devices`
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (text)
      - `created_by` (uuid, references auth.users)
      - `created_at` (timestamp)
    
    - `opflows`
      - `id` (uuid, primary key)
      - `project_id` (uuid, references projects)
      - `data` (jsonb)
      - `uploaded_by` (uuid, references auth.users)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  role_id uuid REFERENCES roles NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, role_id)
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_by uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create devices table
CREATE TABLE IF NOT EXISTS devices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  created_by uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create opflows table
CREATE TABLE IF NOT EXISTS opflows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects NOT NULL,
  data jsonb NOT NULL,
  uploaded_by uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE opflows ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read roles" ON roles
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage roles" ON roles
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.name = 'admin'
    )
  );

CREATE POLICY "Users can read their roles" ON user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can manage user roles" ON user_roles
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.name = 'admin'
    )
  );

CREATE POLICY "Users can read projects" ON projects
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can manage their projects" ON projects
  FOR ALL TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Users can read devices" ON devices
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can manage their devices" ON devices
  FOR ALL TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Users can read opflows" ON opflows
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can manage their opflows" ON opflows
  FOR ALL TO authenticated
  USING (uploaded_by = auth.uid());

-- Insert default roles
INSERT INTO roles (name) VALUES
  ('admin'),
  ('analyst'),
  ('user')
ON CONFLICT DO NOTHING;