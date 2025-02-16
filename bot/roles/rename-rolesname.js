const role = await guild.roles.fetch('ROLE_ID');
role.setName('NewRoleName')
  .then(updatedRole => console.log(`Role updated to: ${updatedRole.name}`))
  .catch(err => console.error('Error updating role:', err));
