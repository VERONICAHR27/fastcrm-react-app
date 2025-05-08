import React from 'react';
import { Link } from 'react-router-dom';

const DashboardCard = ({ title, count, icon, color, to }) => (
  <Link to={to} className="block">
    <div className={`bg-white border-l-4 ${color} rounded-lg shadow-md p-6 transition-transform duration-200 hover:transform hover:scale-105`}>
      <div className="flex items-center">
        <div className={`rounded-full p-3 ${color.replace('border-l-4', 'bg').replace('border', 'bg')} bg-opacity-10`}>
          <span className="text-3xl">{icon}</span>
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-medium text-gray-700">{title}</h3>
          <p className="text-3xl font-bold text-gray-800">{count}</p>
        </div>
      </div>
    </div>
  </Link>
);

const QuickActions = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-xl font-medium text-gray-700 mb-4">Acciones rápidas</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <ActionButton to="/contacts/form" icon="👤" color="bg-blue-100 text-blue-600">
        Nuevo contacto
      </ActionButton>
      <ActionButton to="/companies/form" icon="🏢" color="bg-purple-100 text-purple-600">
        Nueva empresa
      </ActionButton>
      <ActionButton to="/templates/form" icon="📋" color="bg-green-100 text-green-600">
        Nueva plantilla
      </ActionButton>
      <ActionButton to="/history" icon="📝" color="bg-amber-100 text-amber-600">
        Ver historial
      </ActionButton>
    </div>
  </div>
);

const ActionButton = ({ to, icon, color, children }) => (
  <Link to={to} className={`${color} flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-200 hover:shadow-md`}>
    <span className="text-2xl mb-1">{icon}</span>
    <span className="text-sm font-medium">{children}</span>
  </Link>
);

const RecentActivity = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-xl font-medium text-gray-700 mb-4">Actividad reciente</h3>
    <div className="space-y-4">
      <ActivityItem 
        title="Nuevo contacto agregado" 
        description="John Doe (johndoe@example.com)" 
        time="Hace 2 horas"
        icon="👤"
        color="bg-blue-100 text-blue-600"
      />
      <ActivityItem 
        title="Mensaje enviado" 
        description="Seguimiento a empresa XYZ" 
        time="Hace 3 horas"
        icon="📧"
        color="bg-green-100 text-green-600"
      />
      <ActivityItem 
        title="Plantilla creada" 
        description="Bienvenida - Nuevos clientes" 
        time="Hace 1 día"
        icon="📋"
        color="bg-purple-100 text-purple-600"
      />
    </div>
  </div>
);

const ActivityItem = ({ title, description, time, icon, color }) => (
  <div className="flex items-start">
    <div className={`rounded-full p-2 ${color}`}>
      <span className="text-lg">{icon}</span>
    </div>
    <div className="ml-3">
      <h4 className="text-sm font-medium text-gray-700">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
      <span className="text-xs text-gray-500">{time}</span>
    </div>
  </div>
);

function HomePage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Panel de control</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard 
          title="Contactos" 
          count="126" 
          icon="👥" 
          color="border-blue-500" 
          to="/contacts"
        />
        <DashboardCard 
          title="Empresas" 
          count="38" 
          icon="🏢" 
          color="border-purple-500" 
          to="/companies"
        />
        <DashboardCard 
          title="Plantillas" 
          count="17" 
          icon="📋" 
          color="border-green-500" 
          to="/templates"
        />
        <DashboardCard 
          title="Mensajes" 
          count="254" 
          icon="📝" 
          color="border-amber-500" 
          to="/history"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <QuickActions />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
