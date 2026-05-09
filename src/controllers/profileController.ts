import { Request, Response } from 'express';
import { Profile } from '../models/Profile';
import { ApiResponse } from '../types';

export class ProfileController {
  /**
   * @swagger
   * /profile:
   *   post:
   *     summary: Create a new profile
   *     tags: [Profile]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Profile'
   *     responses:
   *       201:
   *         description: Profile created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Profile created successfully
   *                 data:
   *                   $ref: '#/components/schemas/Profile'
   *       400:
   *         description: Profile already exists
   *         $ref: '#/components/responses/BadRequest'
   *       500:
   *         $ref: '#/components/responses/ServerError'
   */
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

  /**
   * @swagger
   * /profile:
   *   get:
   *     summary: Get full profile details
   *     tags: [Profile]
   *     responses:
   *       200:
   *         description: Profile retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 message:
   *                   type: string
   *                 data:
   *                   $ref: '#/components/schemas/Profile'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   *       500:
   *         $ref: '#/components/responses/ServerError'
   */
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

  /**
   * @swagger
   * /profile:
   *   put:
   *     summary: Update full profile (all fields)
   *     tags: [Profile]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Profile'
   *     responses:
   *       200:
   *         description: Profile updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 message:
   *                   type: string
   *                 data:
   *                   $ref: '#/components/schemas/Profile'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   *       500:
   *         $ref: '#/components/responses/ServerError'
   */
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

  /**
   * @swagger
   * /profile:
   *   patch:
   *     summary: Partially update profile (specific fields)
   *     tags: [Profile]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               availability:
   *                 type: string
   *                 enum: [available, interviewing, not-available]
   *               expectedSalary:
   *                 type: number
   *               willingToRelocate:
   *                 type: boolean
   *               skills:
   *                 type: array
   *                 items:
   *                   type: string
   *     responses:
   *       200:
   *         description: Profile updated successfully
   *       404:
   *         $ref: '#/components/responses/NotFound'
   *       500:
   *         $ref: '#/components/responses/ServerError'
   */
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

  /**
   * @swagger
   * /profile:
   *   delete:
   *     summary: Delete profile
   *     tags: [Profile]
   *     responses:
   *       200:
   *         description: Profile deleted successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Profile deleted successfully
   *       404:
   *         $ref: '#/components/responses/NotFound'
   *       500:
   *         $ref: '#/components/responses/ServerError'
   */
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

  /**
   * @swagger
   * /profile/public:
   *   get:
   *     summary: Get public profile (limited fields for public view)
   *     tags: [Profile]
   *     responses:
   *       200:
   *         description: Public profile retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 message:
   *                   type: string
   *                 data:
   *                   $ref: '#/components/schemas/PublicProfile'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   *       500:
   *         $ref: '#/components/responses/ServerError'
   */
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