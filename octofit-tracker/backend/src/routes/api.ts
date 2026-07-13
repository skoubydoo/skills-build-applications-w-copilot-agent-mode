import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

const router = Router();

router.get('/users/', async (_req, res, next) => {
  try {
    const data = await User.find().populate('team', 'name coach').sort({ name: 1 }).lean();
    res.status(200).json({ resource: 'users', data });
  } catch (error) {
    next(error);
  }
});

router.get('/teams/', async (_req, res, next) => {
  try {
    const data = await Team.find().populate('members', 'name email role').sort({ name: 1 }).lean();
    res.status(200).json({ resource: 'teams', data });
  } catch (error) {
    next(error);
  }
});

router.get('/activities/', async (_req, res, next) => {
  try {
    const data = await Activity.find().populate('user', 'name email').sort({ performedAt: -1 }).lean();
    res.status(200).json({ resource: 'activities', data });
  } catch (error) {
    next(error);
  }
});

router.get('/leaderboard/', async (_req, res, next) => {
  try {
    const data = await Leaderboard.find()
      .populate('user', 'name email')
      .populate('team', 'name')
      .sort({ rank: 1 })
      .lean();
    res.status(200).json({ resource: 'leaderboard', data });
  } catch (error) {
    next(error);
  }
});

router.get('/workouts/', async (_req, res, next) => {
  try {
    const data = await Workout.find().sort({ difficulty: 1, title: 1 }).lean();
    res.status(200).json({ resource: 'workouts', data });
  } catch (error) {
    next(error);
  }
});

export default router;
