import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
      User.deleteMany({}),
      Team.deleteMany({}),
    ]);

    const enduranceTeamId = new mongoose.Types.ObjectId();
    const strengthTeamId = new mongoose.Types.ObjectId();

    const users = await User.insertMany([
      {
        name: 'Avery Chen',
        email: 'avery.chen@example.com',
        team: enduranceTeamId,
        role: 'Runner',
        fitnessGoal: 'Run a sub-25 minute 5K',
        weeklyTargetMinutes: 240,
      },
      {
        name: 'Jordan Patel',
        email: 'jordan.patel@example.com',
        team: enduranceTeamId,
        role: 'Cyclist',
        fitnessGoal: 'Build endurance for a charity ride',
        weeklyTargetMinutes: 300,
      },
      {
        name: 'Mina Rodriguez',
        email: 'mina.rodriguez@example.com',
        team: strengthTeamId,
        role: 'Strength Trainer',
        fitnessGoal: 'Increase total-body strength',
        weeklyTargetMinutes: 210,
      },
      {
        name: 'Sam Williams',
        email: 'sam.williams@example.com',
        team: strengthTeamId,
        role: 'Hiker',
        fitnessGoal: 'Prepare for a mountain trek',
        weeklyTargetMinutes: 270,
      },
    ]);

    const teams = await Team.insertMany([
      {
        _id: enduranceTeamId,
        name: 'Endurance Engineers',
        description: 'Cardio-focused teammates training for races and long rides.',
        coach: 'Coach Rivera',
        members: [users[0]._id, users[1]._id],
      },
      {
        _id: strengthTeamId,
        name: 'Core Commit Crew',
        description: 'Strength and mobility group balancing lifting with outdoor goals.',
        coach: 'Coach Morgan',
        members: [users[2]._id, users[3]._id],
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        activityType: 'Run',
        durationMinutes: 42,
        distanceMiles: 4.8,
        caloriesBurned: 430,
        performedAt: new Date('2026-07-06T13:30:00.000Z'),
      },
      {
        user: users[1]._id,
        activityType: 'Cycling',
        durationMinutes: 75,
        distanceMiles: 18.4,
        caloriesBurned: 690,
        performedAt: new Date('2026-07-07T21:15:00.000Z'),
      },
      {
        user: users[2]._id,
        activityType: 'Strength Training',
        durationMinutes: 55,
        distanceMiles: 0,
        caloriesBurned: 360,
        performedAt: new Date('2026-07-08T12:00:00.000Z'),
      },
      {
        user: users[3]._id,
        activityType: 'Hiking',
        durationMinutes: 96,
        distanceMiles: 5.6,
        caloriesBurned: 740,
        performedAt: new Date('2026-07-09T15:45:00.000Z'),
      },
    ]);

    await Leaderboard.insertMany([
      { user: users[1]._id, team: teams[0]._id, points: 1320, rank: 1, period: 'weekly' },
      { user: users[3]._id, team: teams[1]._id, points: 1185, rank: 2, period: 'weekly' },
      { user: users[0]._id, team: teams[0]._id, points: 1110, rank: 3, period: 'weekly' },
      { user: users[2]._id, team: teams[1]._id, points: 1040, rank: 4, period: 'weekly' },
    ]);

    await Workout.insertMany([
      {
        title: '5K Pace Builder',
        description: 'Intervals and tempo work for improving short-distance race pace.',
        difficulty: 'Intermediate',
        durationMinutes: 45,
        focusAreas: ['cardio', 'speed', 'running'],
        exercises: ['10 minute warmup jog', '6 x 400m intervals', 'Tempo cooldown'],
        recommendedFor: 'Runners targeting faster 5K times',
      },
      {
        title: 'Trail-Ready Strength',
        description: 'Lower-body and core work for climbs, descents, and loaded hikes.',
        difficulty: 'Beginner',
        durationMinutes: 35,
        focusAreas: ['legs', 'core', 'mobility'],
        exercises: ['Step-ups', 'Goblet squats', 'Plank shoulder taps', 'Hip mobility flow'],
        recommendedFor: 'Hikers preparing for uneven terrain',
      },
      {
        title: 'Ride Recovery Flow',
        description: 'Low-impact mobility session to recover after long cycling days.',
        difficulty: 'Beginner',
        durationMinutes: 25,
        focusAreas: ['mobility', 'recovery', 'hips'],
        exercises: ['World greatest stretch', 'Hamstring flossing', 'Pigeon pose', 'Box breathing'],
        recommendedFor: 'Cyclists and endurance athletes',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
