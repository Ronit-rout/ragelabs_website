-- Users Table for Login and Signup
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    institution VARCHAR(255),
    profile_type VARCHAR(100),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Job Applications Table
CREATE TABLE IF NOT EXISTS job_application (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    address VARCHAR(255),
    skills TEXT,
    experience VARCHAR(100),
    preferred_role VARCHAR(100),
    career_goals TEXT,
    referral_source VARCHAR(100),
    motivation TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pitches Table
CREATE TABLE IF NOT EXISTS pitches (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    founder_name VARCHAR(255) NOT NULL,
    linkedin VARCHAR(255),
    email VARCHAR(255),
    twitter VARCHAR(255),
    past_projects TEXT,
    primary_role VARCHAR(100),
    weekly_hours VARCHAR(50),
    project_name VARCHAR(255) NOT NULL,
    problem TEXT,
    solution TEXT,
    target_audience TEXT,
    mvp_feature1 VARCHAR(255),
    mvp_feature2 VARCHAR(255),
    mvp_feature3 VARCHAR(255),
    platform VARCHAR(255),
    integrations TEXT,
    user_validation TEXT,
    acquisition_strategy TEXT,
    competitor1 VARCHAR(255),
    competitor2 VARCHAR(255),
    competitor3 VARCHAR(255),
    status VARCHAR(20) DEFAULT 'pending',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);