#!/bin/bash
if [[ $1 == restart ]]; then 
mongod &
mongod_pid=$!
echo ------------------------pid----------------
echo $mongod_pid
until mongo --eval "print(\"waited for connection\")"
  do
    echo .; sleep 1 
  done
fi

index=0
for element in $Weinote_Mongo_Databases; 
do echo "$element"; echo ---------------------;
mongo -- "$element" <<EOF
    var rootUser = '$MONGO_INITDB_ROOT_USERNAME';
    var rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
    var admin = db.getSiblingDB('admin');
    admin.auth(rootUser, rootPassword);
    use $element;
    var user = '$Weinote_Mongo_Username';
    var passwd = '$Weinote_Mongo_Password';
    db.createUser({user: user, pwd: passwd, roles: [{role: "readWrite", db: '$element'}]});
EOF
done;

if [[ $1 == restart ]]; then 
    [ -n "${mongod_pid}" -a -d "/proc/${mongod_pid}" ] && echo "process exists" || echo "process not exists"
    kill $mongod_pid; 
    wait $mongod_pid; 
    [ -n "${mongod_pid}" -a -d "/proc/${mongod_pid}" ] && echo "process exists" || echo "process not exists"
    mongod --bind_ip_all; 
fi
