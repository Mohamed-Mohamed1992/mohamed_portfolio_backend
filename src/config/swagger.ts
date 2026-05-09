import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mohamed Portfolio API',
      version: '1.0.0',
      description: 'Developer Portfolio API with Node.js, Express, MySQL, Sequelize, TypeScript',
      contact: {
        name: 'Mohamed Ahmed',
        email: 'mohamed@example.com',
        url: 'https://github.com/mohamedahmed',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Development server',
      },
      {
        url: 'https://api.yourdomain.com/api',
        description: 'Production server',
      },
    ],
    components: {
      schemas: {
        Profile: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Auto-generated ID',
              example: 1,
            },
            name: {
              type: 'string',
              description: 'Full name',
              example: 'Mohamed Ahmed',
              minLength: 2,
              maxLength: 100,
            },
            bio: {
              type: 'string',
              description: 'Biography/About me',
              example: 'Full Stack Developer with 5+ years of experience...',
            },
            location: {
              type: 'string',
              description: 'Current location',
              example: 'Cairo, Egypt',
            },
            nationality: {
              type: 'string',
              description: 'Nationality',
              example: 'Egyptian',
            },
            availability: {
              type: 'string',
              enum: ['available', 'interviewing', 'not-available'],
              description: 'Current availability status',
              example: 'available',
            },
            dateOfBirth: {
              type: 'string',
              format: 'date',
              description: 'Date of birth',
              example: '1995-06-15',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address',
              example: 'mohamed@example.com',
            },
            phone: {
              type: 'string',
              description: 'Phone number',
              example: '+201234567890',
            },
            address: {
              type: 'string',
              description: 'Physical address',
              example: '123 Nile Street, Cairo, Egypt',
            },
            github: {
              type: 'string',
              format: 'url',
              description: 'GitHub profile URL',
              example: 'https://github.com/mohamedahmed',
            },
            twitter: {
              type: 'string',
              format: 'url',
              description: 'Twitter profile URL',
              example: 'https://twitter.com/mohamedahmed',
            },
            linkedin: {
              type: 'string',
              format: 'url',
              description: 'LinkedIn profile URL',
              example: 'https://linkedin.com/in/mohamedahmed',
            },
            expectedSalary: {
              type: 'number',
              format: 'decimal',
              description: 'Expected salary in USD',
              example: 75000,
              minimum: 0,
            },
            ownACar: {
              type: 'boolean',
              description: 'Owns a car',
              example: true,
            },
            haveDrivingLicense: {
              type: 'boolean',
              description: 'Has driving license',
              example: true,
            },
            noticePeriod: {
              type: 'integer',
              description: 'Notice period in days',
              example: 30,
              minimum: 0,
            },
            immigrationStatus: {
              type: 'string',
              description: 'Immigration status',
              example: 'Citizen',
            },
            referees: {
              type: 'array',
              description: 'Professional referees',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  position: { type: 'string' },
                  company: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                  phone: { type: 'string' },
                },
              },
              example: [
                {
                  name: 'John Doe',
                  position: 'CTO',
                  company: 'Tech Corp',
                  email: 'john@techcorp.com',
                },
              ],
            },
            willingToRelocate: {
              type: 'boolean',
              description: 'Willing to relocate',
              example: true,
            },
            languages: {
              type: 'array',
              description: 'Languages spoken',
              items: { type: 'string' },
              example: ['English', 'Arabic', 'French'],
            },
            skills: {
              type: 'array',
              description: 'Technical skills',
              items: { type: 'string' },
              example: ['React', 'Node.js', 'TypeScript', 'Python', 'MySQL'],
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
          },
          required: [
            'name', 'bio', 'location', 'nationality', 'dateOfBirth',
            'email', 'phone', 'address', 'expectedSalary', 'noticePeriod',
            'immigrationStatus'
          ],
        },
        PublicProfile: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Mohamed Ahmed' },
            bio: { type: 'string', example: 'Full Stack Developer...' },
            location: { type: 'string', example: 'Cairo, Egypt' },
            nationality: { type: 'string', example: 'Egyptian' },
            availability: { type: 'string', enum: ['available', 'interviewing', 'not-available'] },
            github: { type: 'string', format: 'url' },
            twitter: { type: 'string', format: 'url' },
            linkedin: { type: 'string', format: 'url' },
            skills: { type: 'array', items: { type: 'string' } },
            languages: { type: 'array', items: { type: 'string' } },
            willingToRelocate: { type: 'boolean' },
            haveDrivingLicense: { type: 'boolean' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Error message' },
            error: { type: 'string', example: 'Detailed error' },
          },
        },
        Success: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Operation successful' },
            data: { type: 'object' },
          },
        },
      },
      responses: {
        BadRequest: {
          description: 'Bad Request',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        NotFound: {
          description: 'Not Found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        ServerError: {
          description: 'Internal Server Error',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Profile',
        description: 'Profile management endpoints',
      },
      {
        name: 'Health',
        description: 'Health check endpoints',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Path to the API docs
};

export const swaggerSpec = swaggerJsdoc(options);