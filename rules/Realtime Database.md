# Padrão
{
  "rules": {
    ".read": false,
    ".write": false
  }
}

# Público
{
  "rules": {
    ".read": true,
    ".write": true
  }
}

# Usuários autenticados
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}

# Usuários autenticados
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}

# Acesso restrito ao dono dos dados
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid == auth.uid",
        ".write": "$uid == auth.uid"
      }  
    }    
  }
}

# Acesso restrito ao dono dos dados e regras de validação
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid == auth.uid",
        ".write": "$uid == auth.uid",
        "$tid": {
          ".validate": "newData.child('name').isString() && newData.child('name').val().length <= 30"
        }
      }  
    }    
  }
}