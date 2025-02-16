const role = await guild.roles.fetch('ROLE_ID'); // Replace with actual role ID
role.delete()
  .then(() => console.log('Role deleted'))
  .catch(err => console.error('Error deleting role:', err));
