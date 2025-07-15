
console.log('🔄 Limpiando eventos del localStorage...');
if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
  localStorage.removeItem('admin_events');
  console.log('✅ Eventos antiguos eliminados del localStorage');
  console.log('🔄 Los nuevos eventos se cargarán automáticamente en la próxima visita');
  console.log('📋 Nuevos eventos disponibles:');
  console.log('- 18 JUL - Ovalle Casino Resort');
  console.log('- 01 AGO - OVO Beach Coquimbo (Aniversario)');
  console.log('- 08 AGO - Enjoy Antofagasta');
  console.log('- 14 AGO - Fraternidad La Diablada, Calama');
  console.log('- 28 AGO - Salón Refugio Tropical, Copiapó');
  console.log('- 29 AGO - Evento privado, Copiapó');
  console.log('- 31 AGO - Evento privado, La Serena');
} else {
  console.log('❌ localStorage no disponible');
}

