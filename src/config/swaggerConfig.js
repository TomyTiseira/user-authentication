import { PORT } from './enviroment.js';
import swaggerJsDocs from 'swagger-jsdoc';

const componentsSwagger = {
  schemas: {
    User: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'usuario123' },
        password: { type: 'string', example: 'contraseñaSegura123' },
        role: { type: 'string', example: 'admin' },
        isActive: { type: 'boolean', example: true }
      },
      required: ['username', 'password', 'role']
    },
    UserRequest: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'usuario123' },
        password: { type: 'string', example: 'contraseñaSegura123' }
      },
      required: ['username', 'password']
    },
    UserUpdateRequest: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'usuario123' },
        password: { type: 'string', example: 'contraseñaSegura123' },
        role: { type: 'string', example: 'admin' }
      },
      required: ['username', 'password']
    },
    LoginRequest: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'usuario123' },
        password: { type: 'string', example: 'contraseñaSegura123' }
      },
      required: ['username', 'password']
    },
    LoginResponse: {
      type: 'object',
      properties: {
        user: { $ref: '#/components/schemas/User' },
        token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5...' }
      }
    },
    ValidationError: {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'ValidationError' },
            message: { type: 'string', example: 'El campo username es obligatorio' }
          }
        }
      }
    },
    UserError: {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'UserError' },
            message: { type: 'string', example: 'El usuario no existe' }
          }
        }
      }
    },
    RoleError: {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'RoleError' },
            message: { type: 'string', example: 'El rol no existe' }
          }
        }
      }
    },
    InvalidRefreshTokenError: {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'InvalidRefreshTokenError' },
            message: { type: 'string', example: 'Refresh token no válido o expirado' }
          }
        }
      }
    },
    MissingRefreshTokenError: {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'MissingRefreshTokenError' },
            message: { type: 'string', example: 'No existe el refresh token' }
          }
        }
      }
    },
    InvalidAuthTokenError: {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'InvalidAuthTokenError' },
            message: { type: 'string', example: 'Token no válido' }
          }
        }
      }
    },
    MissingAuthTokenError: {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'MissingAuthTokenError' },
            message: { type: 'string', example: 'Acceso no autorizado' }
          }
        }
      }
    },
    UnauthorizedAccessError: {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'UnauthorizedAccessError' },
            message: { type: 'string', example: 'Acceso no autorizado' }
          }
        }
      }
    },
    RefreshToken: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Token refrescado exitosamente' }
      }
    },
    Logout: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Sesión cerrada exitosamente' }
      }
    },
    ErrorResponse: {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'UserError' },
            message: { type: 'string', example: 'El usuario no existe' }
          }
        }
      }
    },
    securitySchemas: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};

const errorsAuth = {
  401: {
    description: 'Acceso no autorizado',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/MissingAuthTokenError'
        }
      }
    }
  },
  403: {
    description: 'Acceso no autorizado o token no válido',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/ErrorResponse'
        },
        examples: {
          unauthorizedAccess: {
            summary: 'Acceso no autorizado',
            value: {
              error: {
                name: 'UnauthorizedAccessError',
                message: 'No tienes permiso para acceder a este recurso'
              }
            }
          },
          tokenInvalid: {
            summary: 'Token no válido',
            value: {
              error: {
                name: 'InvalidAuthTokenError',
                message: 'El token proporcionado no es válido'
              }
            }
          }
        }
      }
    }
  }
};

const errorsRefreshToken = {
  401: {
    description: 'No existe el refresh token',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/MissingRefreshTokenError'
        }
      }
    }
  },
  403: {
    description: 'Refresh token no válido o expirado',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/InvalidRefreshTokenError'
        }
      }
    }
  }
};

const errorValidation = {
  400: {
    description: 'Error de validación',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/ValidationError'
        }
      }
    }
  }
};

const errorUser = {
  404: {
    description: 'Error de usuario',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/UserError'
        }
      }
    }
  }
};

const errorRole = {
  404: {
    description: 'Error de rol',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/RolError'
        }
      }
    }
  }
};

const userCreate = {
  201: {
    description: 'Usuario creado exitosamente',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/User'
        }
      }
    }
  }
};

const pathAuth = {
  '/login': {
    post: {
      tags: ['Auth'],
      summary: 'Iniciar sesión',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/LoginRequest'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Usuario autenticado',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginResponse'
              }
            }
          }
        },
        ...errorValidation,
        ...errorUser
      }
    }
  },
  '/refresh': {
    post: {
      tags: ['Auth'],
      summary: 'Refrescar token',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Token refrescado exitosamente',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RefreshToken'
              }
            }
          }
        },
        ...errorsRefreshToken
      }
    }
  },
  '/logout': {
    post: {
      tags: ['Auth'],
      summary: 'Cerrar sesión',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Sesión cerrada exitosamente',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Logout'
              }
            }
          }
        }
      }
    }
  },
  '/profile': {
    get: {
      tags: ['Auth'],
      summary: 'Obtener perfil',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Perfil obtenido exitosamente',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        },
        401: {
          description: 'Acceso no autorizado',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/MissingAuthTokenError'
              }
            }
          }
        },
        403: {
          description: 'Token no válido',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/InvalidAuthTokenError'
              }
            }
          }
        }
      }
    }
  }
};

const pathUser = {
  '/user/create': {
    post: {
      tags: ['User'],
      summary: 'Crear usuario',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UserRequest'
            }
          }
        }
      },
      responses: {
        ...userCreate,
        ...errorValidation,
        ...errorUser
      }
    }
  },
  '/user/createAdmin': {
    post: {
      tags: ['User'],
      summary: 'Crear Usuario Administrador',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UserRequest'
            }
          }
        }
      },
      responses: {
        ...userCreate,
        ...errorValidation,
        ...errorsAuth,
        ...errorUser
      }
    }
  },
  '/user': {
    get: {
      tags: ['User'],
      summary: 'Obtener todos los usuarios',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'includeInactive',
          in: 'query',
          description: 'Incluir usuarios inactivos en la respuesta',
          required: false,
          schema: {
            type: 'string'
          }
        }
      ],
      responses: {
        200: {
          description: 'Usuarios obtenidos exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          }
        },
        ...errorsAuth
      }
    }
  },
  '/user/{id}': {
    get: {
      tags: ['User'],
      summary: 'Obtener usuario por ID',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      responses: {
        200: {
          description: 'Usuario obtenido exitosamente',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        },
        ...errorsAuth,
        ...errorUser
      }
    },
    put: {
      tags: ['User'],
      summary: 'Actualizar usuario por ID',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UserUpdateRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Usuario actualizado exitosamente',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        },
        ...errorsAuth,
        ...errorUser
      }
    },
    delete: {
      tags: ['User'],
      summary: 'Eliminar usuario por ID',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      responses: {
        200: {
          description: 'Usuario eliminado exitosamente',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        },
        ...errorsAuth,
        ...errorUser
      }
    }
  }
};

const pathRole = {
  '/role/create': {
    post: {
      tags: ['Role'],
      summary: 'Crear rol',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string', example: 'admin' }
              },
              required: ['name']
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Rol creado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'admin' }
                }
              }
            }
          }
        },
        ...errorValidation,
        ...errorsAuth,
        ...errorRole
      }
    }
  },
  '/role': {
    get: {
      tags: ['Role'],
      summary: 'Obtener rol',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'includeInactive',
          in: 'query',
          description: 'Incluir usuarios inactivos en la respuesta',
          required: false,
          schema: {
            type: 'string'
          }
        }
      ],
      responses: {
        200: {
          description: 'Rol obtenido exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'admin' }
                }
              }
            }
          }
        },
        ...errorsAuth
      }
    }
  },
  '/role/{id}': {
    get: {
      tags: ['Role'],
      summary: 'Obtener rol por id',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      responses: {
        200: {
          description: 'Rol obtenido exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'admin' }
                }
              }
            }
          }
        },
        ...errorsAuth,
        ...errorRole
      }
    },
    put: {
      tags: ['Role'],
      summary: 'Actualizar rol por id',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string', example: 'admin' }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Rol actualizado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'admin' }
                }
              }
            }
          }
        },
        ...errorsAuth,
        ...errorRole
      }
    },
    delete: {
      tags: ['Role'],
      summary: 'Eliminar rol por id',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      respose: {
        200: {
          description: 'Rol eliminado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'admin' }
                }
              }
            }
          }
        },
        ...errorsAuth,
        ...errorRole
      }
    }
  }
};

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Autenticación con JWT',
      version: '1.0.0',
      description: 'API para autenticación con JWT con manejo de roles y permisos'
    },
    servers: [
      {
        url: `http://localhost:${PORT}`
      }
    ],
    components: componentsSwagger,
    paths: {
      ...pathAuth,
      ...pathUser,
      ...pathRole
    }
  },
  apis: ['./src/User/user.routes.js', './src/Auth/auth.routes.js']
};

export const swaggerDocs = swaggerJsDocs(swaggerOptions);
