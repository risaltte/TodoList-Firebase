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

# Acesso restrito ao dono dos dados e regras de validação (filtragem e ordenação de dados)
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid == auth.uid",
        ".write": "$uid == auth.uid",
        ".indexOn": "nameLowerCase",
        "$tid": {
          ".validate": "newData.child('name').isString() && newData.child('name').val().length <= 30 && newData.child('nameLowerCase').isString() && newData.child('nameLowerCase').val().length <= 30"
        }
      }  
    }    
  }
}