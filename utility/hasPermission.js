const fs = require('fs')

const rolesConfigPath = process.env.ROLES_CONFIG_PATH
function hasPermissions(command, userRoles) {
  try {
    const list = JSON.parse(fs.readFileSync(rolesConfigPath, 'utf-8'))
    const requiredRoles = list[command] || [] // Default to empty array
    return userRoles.some((roleID) => requiredRoles.includes(roleID))
  } catch (error) {
    console.error('Error checking permissions:', error)
    // Handle the error here (e.g., log or return a default value)
    return false // Example default value
  }
}

module.exports = {
  hasPermissions,
}
