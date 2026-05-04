import { Request, Response } from 'express';
import { Profile } from '../models/Profile';
import { ApiResponse } from '../types';

export class ProfileController {
  // Create new profile
  static async createProfile(req: Request, res: Response): Promise<void> {
    try {
      const profileData = req.body;
      
      // Check if profile already exists
      const existingProfile = await Profile.findOne();
      if (existingProfile) {
        res.status(400).json({
          success: false,
          message: 'Profile already exists. Use update endpoint instead.',
        } as ApiResponse<null>);
        return;
      }

      const profile = await Profile.create(profileData);
      res.status(201).json({
        success: true,
        message: 'Profile created successfully',
        data: profile,
      } as ApiResponse<Profile>);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error creating profile',
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  // Get profile
  static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const profile = await Profile.findOne();
      
      if (!profile) {
        res.status(404).json({
          success: false,
          message: 'Profile not found',
        } as ApiResponse<null>);
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Profile retrieved successfully',
        data: profile,
      } as ApiResponse<Profile>);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching profile',
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  // Update full profile
  static async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const profile = await Profile.findOne();
      
      if (!profile) {
        res.status(404).json({
          success: false,
          message: 'Profile not found',
        } as ApiResponse<null>);
        return;
      }

      await profile.update(req.body);
      const updatedProfile = await Profile.findByPk(profile.id);
      
      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: updatedProfile,
      } as ApiResponse<Profile>);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error updating profile',
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  // Partial update (PATCH)
  static async patchProfile(req: Request, res: Response): Promise<void> {
    try {
      const profile = await Profile.findOne();
      
      if (!profile) {
        res.status(404).json({
          success: false,
          message: 'Profile not found',
        } as ApiResponse<null>);
        return;
      }

      const allowedUpdates = [
        'name', 'bio', 'location', 'nationality', 'availability',
        'email', 'phone', 'address', 'github', 'twitter', 'linkedin',
        'expectedSalary', 'ownACar', 'haveDrivingLicense', 'noticePeriod',
        'immigrationStatus', 'referees', 'willingToRelocate', 'languages', 'skills'
      ];
      
      const updates: any = {};
      for (const key of allowedUpdates) {
        if (req.body[key] !== undefined) {
          updates[key] = req.body[key];
        }
      }

      await profile.update(updates);
      const updatedProfile = await Profile.findByPk(profile.id);
      
      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: updatedProfile,
      } as ApiResponse<Profile>);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error updating profile',
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  // Delete profile
  static async deleteProfile(req: Request, res: Response): Promise<void> {
    try {
      const profile = await Profile.findOne();
      
      if (!profile) {
        res.status(404).json({
          success: false,
          message: 'Profile not found',
        } as ApiResponse<null>);
        return;
      }

      await profile.destroy();
      res.status(200).json({
        success: true,
        message: 'Profile deleted successfully',
      } as ApiResponse<null>);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error deleting profile',
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  // Get public profile (limited fields)
  static async getPublicProfile(req: Request, res: Response): Promise<void> {
    try {
      const profile = await Profile.findOne({
        attributes: [
          'name', 'bio', 'location', 'nationality', 'availability',
          'github', 'twitter', 'linkedin', 'skills', 'languages',
          'willingToRelocate', 'haveDrivingLicense'
        ],
      });
      
      if (!profile) {
        res.status(404).json({
          success: false,
          message: 'Profile not found',
        } as ApiResponse<null>);
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Public profile retrieved successfully',
        data: profile,
      } as ApiResponse<Profile>);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error fetching public profile',
        error: error.message,
      } as ApiResponse<null>);
    }
  }
}