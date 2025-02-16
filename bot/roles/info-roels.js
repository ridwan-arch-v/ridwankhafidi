const member = await guild.members.fetch('USER_ID');
const roles = member.roles.cache;
console.log(roles.map(role => role.name));  // List of roles the member has
