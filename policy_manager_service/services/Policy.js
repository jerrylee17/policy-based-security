let capabilities = ["create", "read", "update", "delete", "deny"]
let conList = ["public", "sensitive", "highly_confidential", "restricted"]
let policy = {
    "default": {
        "read": "public",
        "create": "public"
    },
    "sensitive": {
        "read": "public",
        "create": "public"
    },
    "highly_confidential": {
        "read": "restricted",
        "create": "restricted"
    },
    "restricted": {
        "read": "restricted",
        "create": "restricted"
    },
    "deny": {
        "read": "",
        "update": "",
        "delete": "",
        "create": ""
    },
    "admin": {
        "read": conList,
        "create": conList,
        "update": conList,
        "delete": conList
    }
}
module.exports = { policy }
