# Heroes App 🦸‍♂️

Aplicación web completa de gestión y visualización de superhéroes desarrollada con React, TypeScript, Vite y TailwindCSS. Permite explorar, buscar, filtrar y marcar como favoritos a tus héroes y villanos preferidos.

## 🌐 Demo en Vivo

**[👉 Ver la aplicación en funcionamiento](https://fantastic-superhero-search.netlify.app/)**

Explora la versión desplegada del proyecto y prueba todas sus funcionalidades.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Variables de Entorno](#-variables-de-entorno)
- [Instalación](#-instalación)
- [Scripts Disponibles](#-scripts-disponibles)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Testing](#-testing)
- [Deployment](#-deployment)

## ✨ Características

- **Navegación de Héroes**: Explora un catálogo completo de superhéroes con paginación
- **Sistema de Filtrado**: Filtra por categorías (héroes, villanos, todos)
- **Búsqueda Avanzada**: Busca héroes por nombre o características
- **Sistema de Favoritos**: Marca y gestiona tus héroes favoritos (persistencia en LocalStorage)
- **Estadísticas**: Visualiza métricas y estadísticas de los héroes
- **Páginas de Detalle**: Información completa de cada superhéroe
- **Lazy Loading**: Carga optimizada de componentes para mejor rendimiento
- **Responsive Design**: Diseño adaptable a diferentes dispositivos
- **Panel de Administración**: Área administrativa para gestión avanzada
- **React Query**: Gestión avanzada de estado asíncrono con caché
- **Testing Completo**: Suite de pruebas unitarias y de integración

## 🚀 Tecnologías

### Core
- **React 19** - Biblioteca principal de UI
- **TypeScript 5.9** - Tipado estático
- **Vite 7** - Build tool y dev server
- **React Router 7** - Enrutamiento de la aplicación

### Estado y Datos
- **TanStack Query (React Query) 5** - Gestión de estado asíncrono y caché
- **Axios** - Cliente HTTP para peticiones a la API
- **Context API** - Gestión de estado global (favoritos)

### Estilos
- **TailwindCSS 4** - Framework de utilidades CSS
- **Radix UI** - Componentes UI accesibles y sin estilos
- **Lucide React** - Iconos
- **class-variance-authority** - Gestión de variantes de componentes
- **tailwind-merge** - Utilidad para combinar clases de Tailwind

### Validación
- **Zod 4** - Validación de esquemas y tipos en runtime

### Testing
- **Vitest 4** - Framework de testing
- **Testing Library** - Librería para testing de componentes React
- **jsdom** - Simulación de DOM para tests
- **axios-mock-adapter** - Mock de peticiones HTTP

### Desarrollo
- **ESLint** - Linter de código
- **SWC** - Compilador rápido de JavaScript/TypeScript

## 📁 Estructura del Proyecto

```
sec13-heroes-app/
│
├── src/
│   ├── main.tsx                    # Punto de entrada de la aplicación
│   ├── HeroesApp.tsx              # Componente raíz con providers
│   ├── index.css                   # Estilos globales
│   ├── setupTests.ts              # Configuración de tests
│   │
│   ├── admin/                     # Módulo de administración
│   │   ├── layouts/
│   │   │   └── AdminLayout.tsx    # Layout del panel admin
│   │   └── pages/
│   │       └── AdminPage.tsx      # Página principal de admin
│   │
│   ├── heroes/                    # Módulo principal de héroes
│   │   │
│   │   ├── actions/               # Acciones asíncronas (server actions)
│   │   │   ├── get-hero.action.tsx              # Obtener héroe individual
│   │   │   ├── get-heroes-by-page.action.tsx    # Paginación de héroes
│   │   │   ├── get-summary.action.tsx           # Estadísticas generales
│   │   │   └── search-heroes.action.tsx         # Búsqueda de héroes
│   │   │
│   │   ├── api/                   # Configuración de APIs
│   │   │   └── hero.api.ts        # Instancia de Axios configurada
│   │   │
│   │   ├── components/            # Componentes del módulo
│   │   │   ├── HeroGrid.tsx       # Grid de héroes
│   │   │   ├── HeroGridCard.tsx   # Tarjeta individual de héroe
│   │   │   ├── HeroStatCard.tsx   # Tarjeta de estadística
│   │   │   └── HeroStats.tsx      # Panel de estadísticas
│   │   │
│   │   ├── context/               # Context API
│   │   │   └── FavoriteHeroContext.tsx  # Contexto de favoritos
│   │   │
│   │   ├── hooks/                 # Custom hooks
│   │   │   ├── useQueryHeroDesc.tsx          # Query para héroe individual
│   │   │   ├── useQueryHeroSummary.tsx       # Query para resumen
│   │   │   ├── useQueryPaginatedHero.tsx     # Query para paginación
│   │   │   └── useQuerySearch.tsx            # Query para búsqueda
│   │   │
│   │   ├── layouts/               # Layouts del módulo
│   │   │   └── HeroesLayout.tsx   # Layout principal con navegación
│   │   │
│   │   ├── pages/                 # Páginas del módulo
│   │   │   ├── home/
│   │   │   │   └── HomePage.tsx   # Página principal
│   │   │   ├── hero/
│   │   │   │   └── HeroPage.tsx   # Detalle de héroe
│   │   │   └── search/
│   │   │       └── SearchPage.tsx # Página de búsqueda
│   │   │
│   │   └── types/                 # Tipos e interfaces
│   │       ├── hero.interface.ts              # Interface de Hero
│   │       ├── get-heroes.response.ts         # Tipo de respuesta paginada
│   │       ├── search-options.interface.ts    # Opciones de búsqueda
│   │       └── summary-information.response.ts # Tipo de resumen
│   │
│   ├── components/                # Componentes compartidos
│   │   ├── custom/                # Componentes personalizados
│   │   │   ├── CustomBreadcrumbs.tsx  # Migas de pan
│   │   │   ├── CustomJumbotron.tsx    # Hero section
│   │   │   ├── CustomMenu.tsx         # Menú de navegación
│   │   │   └── CustomPagination.tsx   # Componente de paginación
│   │   │
│   │   └── ui/                    # Componentes UI base (Radix UI)
│   │       ├── accordion.tsx
│   │       ├── badge.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── progress.tsx
│   │       ├── slider.tsx
│   │       └── tabs.tsx
│   │
│   ├── router/                    # Configuración de rutas
│   │   └── app.router.tsx         # Definición de rutas
│   │
│   └── lib/                       # Utilidades
│       └── utils.ts               # Funciones auxiliares (cn, etc.)
│
├── public/                        # Archivos estáticos
│   ├── robots.txt
│   └── sitemap.xml
│
├── coverage/                      # Reportes de cobertura de tests
│
├── .env.template                  # Template de variables de entorno
├── components.json                # Configuración de componentes UI
├── eslint.config.js              # Configuración de ESLint
├── index.html                     # HTML principal
├── package.json                   # Dependencias y scripts
├── tsconfig.json                  # Configuración de TypeScript
├── tsconfig.app.json             # Config TS para la aplicación
├── tsconfig.node.json            # Config TS para Node
└── vite.config.ts                # Configuración de Vite
```

## 🔐 Variables de Entorno

El proyecto utiliza variables de entorno para configurar la conexión con el backend. Estas deben definirse en un archivo `.env` en la raíz del proyecto.

### Archivo `.env.template`

El proyecto incluye un template que debes copiar y configurar:

```bash
VITE_API_URL = urlServer
```

### Variables Disponibles

| Variable | Descripción | Ejemplo | Requerida |
|----------|-------------|---------|-----------|
| `VITE_API_URL` | URL base del servidor backend de la API de héroes | `http://localhost:3000` o `https://api-heroes.com` | ✅ Sí |

### Uso en el Código

Las variables de entorno se utilizan en varios archivos:

- **src/heroes/api/hero.api.ts**: Configuración base de Axios
- **src/heroes/actions/*.action.tsx**: Para construir URLs completas de imágenes

```typescript
// Ejemplo de uso
const BASE_URL = import.meta.env.VITE_API_URL;
```

### ⚠️ Importante

- Las variables **DEBEN** tener el prefijo `VITE_` para estar disponibles en el cliente
- Se acceden mediante `import.meta.env.NOMBRE_VARIABLE`
- No incluir el archivo `.env` en el control de versiones (ya está en `.gitignore`)
- Crear el archivo `.env` basándose en `.env.template` antes de ejecutar el proyecto

## 📦 Instalación

### Requisitos Previos

- Node.js 18+ 
- npm o yarn

### Pasos

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd sec13-heroes-app
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Copiar el template
cp .env.template .env

# Editar .env con tu URL de API
# VITE_API_URL = http://localhost:3000
```

4. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

5. **Abrir en el navegador**
```
http://localhost:5173
```

## 📜 Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| **dev** | `npm run dev` | Inicia el servidor de desarrollo con Vite |
| **build** | `npm run build` | Ejecuta tests y construye la aplicación para producción |
| **lint** | `npm run lint` | Ejecuta el linter ESLint |
| **preview** | `npm run preview` | Preview de la build de producción localmente |
| **test** | `npm run test` | Ejecuta tests en modo watch |
| **test:ui** | `npm run test:ui` | Ejecuta tests con interfaz gráfica de Vitest |
| **test:only** | `npm run test:only` | Ejecuta todos los tests una sola vez (sin watch) |
| **coverage** | `npm run coverage` | Genera reporte de cobertura de tests |

## 🏗️ Arquitectura del Proyecto

### Patrón de Diseño

El proyecto sigue una arquitectura modular basada en **feature-first** con separación por dominios:

#### 1. **Módulos por Dominio** (`heroes/`, `admin/`)
Cada feature tiene su propia carpeta con:
- **actions/**: Funciones para fetching de datos
- **api/**: Configuración de clientes HTTP
- **components/**: Componentes específicos del módulo
- **context/**: Context API para estado compartido
- **hooks/**: Custom hooks con lógica reutilizable
- **layouts/**: Layouts específicos
- **pages/**: Componentes de página
- **types/**: Interfaces y tipos TypeScript

#### 2. **Componentes Compartidos** (`components/`)
- **custom/**: Componentes de negocio reutilizables
- **ui/**: Componentes base del design system (Radix UI)

#### 3. **Gestión de Estado**

##### Estado Local
```typescript
// Hooks de React (useState, useReducer)
const [heroes, setHeroes] = useState<Hero[]>([]);
```

##### Estado Asíncrono - TanStack Query
```typescript
// Custom hooks que wrappean useQuery
export const useQueryPaginatedHero = (page: number, limit: number, category: string) => {
  return useQuery({
    queryKey: ['heroes', { page, limit, category }],
    queryFn: () => getHeroesByPageAction(page, limit, category),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
```

##### Estado Global - Context API
```typescript
// FavoriteHeroContext para favoritos
export const FavoriteHeroContext = createContext<FavoriteHeroContextType>({...});

// Con persistencia en localStorage
useEffect(() => {
  localStorage.setItem('favorite-heroes', JSON.stringify(favorites));
}, [favorites]);
```

#### 4. **Routing**

Configuración con React Router 7 usando Hash Router (ideal para GitHub Pages):

```typescript
export const appRouter = createHashRouter([
  {
    path: "/",
    element: <HeroesLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "heroes/:idSlug", element: <HeroPage /> },
      { path: "search", element: <SearchPage /> },
      { path: "*", element: <Navigate to="/" /> }
    ]
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminPage /> }
    ]
  }
]);
```

#### 5. **Fetching de Datos**

**Actions Pattern** - Funciones reutilizables:

```typescript
// src/heroes/actions/get-heroes-by-page.action.tsx
export const getHeroesByPageAction = async (
  page: number, 
  limit: number = 6,
  category: string = 'all'
): Promise<HeroesResponse> => {
  const { data } = await heroApi.get<HeroesResponse>('/', {
    params: { limit, offset: (page - 1) * limit, category }
  });
  return data;
};
```

#### 6. **Validación con Zod**

```typescript
// Validación de datos de localStorage
const HeroSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  // ... más campos
});

const result = HeroesArraySchema.safeParse(JSON.parse(storedFavorites));
if (!result.success) {
  console.error('Error al validar:', result.error);
}
```

#### 7. **Optimizaciones**

- **Code Splitting**: Lazy loading de páginas
```typescript
const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'));
```

- **Memoization**: Evitar re-renders innecesarios
```typescript
const selectedTab = useMemo(() => {
  return validTabs.includes(activeTab) ? activeTab : 'all';
}, [activeTab]);
```

- **React Query Cache**: Datos cacheados con staleTime configurado

## 🧪 Testing

El proyecto utiliza **Vitest** y **Testing Library** para pruebas.

### Configuración

```typescript
// vite.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
  },
});
```

### Tipos de Tests

1. **Unit Tests**: Componentes y funciones individuales
2. **Integration Tests**: Interacciones entre componentes
3. **API Mocking**: Con axios-mock-adapter

### Ejecutar Tests

```bash
# Modo watch (recomendado para desarrollo)
npm run test

# UI interactiva
npm run test:ui

# Ejecutar una vez
npm run test:only

# Con reporte de cobertura
npm run coverage
```

### Archivos de Test

Los tests están junto a sus archivos correspondientes:
- `Component.tsx` → `Component.test.tsx`
- `action.tsx` → `action.test.ts`

### Cobertura

Los reportes de cobertura se generan en la carpeta `coverage/`:
- HTML: `coverage/index.html`
- JSON: `coverage/coverage-final.json`
- XML (Clover): `coverage/clover.xml`

## 🚀 Deployment

### Build de Producción

```bash
# Construir la aplicación
npm run build

# Preview local de la build
npm run preview
```

Los archivos de producción se generan en la carpeta `dist/`.

### Deployment Options

#### 1. **Vercel / Netlify**
- Conectar el repositorio
- Configurar la variable de entorno `VITE_API_URL`
- Build command: `npm run build`
- Output directory: `dist`

#### 2. **GitHub Pages**
- El proyecto usa Hash Router, compatible con GitHub Pages
- Configurar Actions para deploy automático

#### 3. **Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
```

### Variables de Entorno en Producción

Asegúrate de configurar `VITE_API_URL` en tu plataforma de deployment apuntando a tu API de producción.

---

## 👨‍💻 Desarrollo

### Convenciones de Código

- **TypeScript**: Fuertemente tipado, evitar `any`
- **Componentes**: PascalCase, archivos `.tsx`
- **Hooks**: Prefijo `use`, archivos `.tsx`
- **Actions**: Sufijo `.action.tsx`
- **Types**: Interfaces en PascalCase, sufijo `.interface.ts` o `.response.ts`
- **Imports**: Path aliases con `@/` (configurado en tsconfig)

### Agregar Nuevos Componentes UI

```bash
# El proyecto usa componentes base de Radix UI
# Configuración en components.json
```

### Path Aliases

```typescript
// En lugar de: '../../../components/ui/button'
import { Button } from '@/components/ui/button';
```

---

## 📄 Licencia

Este proyecto es parte del curso **"React De cero a experto"** y tiene fines educativos.

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📞 Soporte

Si tienes preguntas o encuentras algún problema, por favor abre un issue en el repositorio.

---

**¡Desarrollado con ❤️ usando React + TypeScript + Vite!**


