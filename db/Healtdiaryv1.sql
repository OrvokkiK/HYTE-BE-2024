-- source C:\code\HYTE\backend\db\Healtdiary.sql

DROP DATABASE IF EXISTS HealthDiary;
CREATE DATABASE HealthDiary;
USE HealthDiary;

-- Create a table for users
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_level VARCHAR(10) NOT NULL DEFAULT 'regular'
);

-- Create a table for diary entries
CREATE TABLE DiaryEntries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    entry_date DATE NOT NULL,
    mood VARCHAR(50),
    weight DECIMAL(5,2),
    sleep_hours INT,
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create a table for Activity
-- Remove duplicate user_id column
CREATE TABLE Activity (
    activity_id INT AUTO_INCREMENT PRIMARY KEY,
    entry_id INT NOT NULL,
    user_id INT,
    activity_type VARCHAR(50),
    duration INT,
    notes TEXT,
    activity_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (entry_id) REFERENCES DiaryEntries(entry_id)
);

 -- Create a table for HR data entries
 -- Remove duplicate user_id column

CREATE TABLE HRdata (
    hr_id INT AUTO_INCREMENT PRIMARY KEY,
    activity_id INT NOT NULL,
    user_id INT,
    average_hr FLOAT,
    light_hr_duration INT,
    moderate_hr_duration INT,
    intense_hr_duration INT,
    peak_hr_duration INT,
    FOREIGN KEY (activity_id) REFERENCES Activity(activity_id)
);



-- INSERT User sample data
-- Iserting multiple user rows at once
INSERT INTO Users (username, password, email, user_level) VALUES
  ('johndoe', 'temp-pw-1', 'johndoe@example.com', 'regular'),
  ('janedoe', 'temp-pw-2', 'janedoe@example.com', 'admin'),
  ('mike_smith', 'temp-pw-3', 'mike@example.com', 'moderator');

SELECT * FROM Users;


-- Inserting multiple diary entries
INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes, created_at) VALUES
  (1, '2024-01-10', 'Happy', 70.5, 8, 'Had a great day, felt energetic', '2024-01-10 20:00:00'),
  (1, '2024-01-11', 'Tired', 70.2, 6, 'Long day at work, need rest', '2024-01-11 20:00:00'),
  (2, '2024-01-10', 'Stressed', 65.0, 7, 'Busy day, a bit stressed out', '2023-12-10 21:00:00');

SELECT * FROM DiaryEntries;

 -- Insert testdata for activity log
INSERT INTO Activity (entry_id, user_id, activity_type, duration, notes, activity_date) VALUES
(1, 1, 'Ice hockey', 3000, 'High intensity training, backcheck', '2024-01-10 18:00:00'),
(1, 1, 'Weight Training', 5400, 'Morning lift, legs feel like hell', '2024-01-11 08:30:00'),
(2, 2, 'Running', 1800, 'Easy run', '2023-12-11 21:30:00');

SELECT * FROM Activity;

-- Insert testdata in HRdata
INSERT INTO HRdata (activity_id, user_id, average_hr, light_hr_duration, moderate_hr_duration, intense_hr_duration, peak_hr_duration) VALUES
(1, 1, 129.0, 497 ,984, 808, 711),
(2, 1, 87.3, 0, 1800, 0, 0),
(3, 2, 84.5, 1000, 2000, 2000, 400);

SELECT * FROM HRdata;
-- Example queries
SELECT Users.username, DiaryEntries.entry_date, DiaryEntries.mood, DiaryEntries.notes
  FROM Users, DiaryEntries
  WHERE DiaryEntries.user_id = Users.user_id;

-- Same with JOIN
SELECT Users.username, DiaryEntries.entry_date, DiaryEntries.mood, DiaryEntries.notes
  FROM Users JOIN DiaryEntries ON DiaryEntries.user_id = Users.user_id;

-- Entries for specific username
SELECT entry_date, mood, sleep_hours FROM DiaryEntries
  JOIN Users ON DiaryEntries.user_id = Users.user_id
  WHERE username = 'johndoe';

--Example quaries
SELECT
    Users.username,
    DiaryEntries.entry_date,
    DiaryEntries.mood,
    DiaryEntries.notes,
    Activity.activity_type,
    HRdata.average_hr,
    HRdata.light_hr_duration,
    HRdata.moderate_hr_duration,
    HRdata.intense_hr_duration,
    HRdata.peak_hr_duration
FROM Users
JOIN DiaryEntries ON Users.user_id = DiaryEntries.user_id
JOIN Activity ON DiaryEntries.entry_id = Activity.activity_id
JOIN HRdata ON DiaryEntries.user_id = HRdata.user_id
WHERE Users.username = 'janedoe';
