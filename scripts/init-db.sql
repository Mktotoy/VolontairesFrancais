-- Create survey_responses table
CREATE TABLE IF NOT EXISTS survey_responses (
    id SERIAL PRIMARY KEY,
    email TEXT,
    answers JSONB NOT NULL,
    version TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster retrieval by version or email if needed
CREATE INDEX IF NOT EXISTS idx_survey_version ON survey_responses(version);
CREATE INDEX IF NOT EXISTS idx_survey_email ON survey_responses(email);
