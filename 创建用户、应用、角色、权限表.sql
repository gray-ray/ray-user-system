-- 创建用户表
CREATE TABLE users (
    user_id serial PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    display_name VARCHAR(100),
    -- 其他用户信息字段
    created_at TIMESTAMP DEFAULT NOW()
);

-- 创建应用表
CREATE TABLE applications (
    app_id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

-- 创建角色表
CREATE TABLE roles (
    role_id serial PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

-- 创建权限表
CREATE TABLE permissions (
    permission_id serial PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

-- 创建用户-应用关联表
CREATE TABLE user_application_map (
    user_id INT REFERENCES users(user_id),
    app_id INT REFERENCES applications(app_id),
    PRIMARY KEY (user_id, app_id)
);

-- 创建用户-角色关联表
CREATE TABLE user_role_map (
    user_id INT REFERENCES users(user_id),
    role_id INT REFERENCES roles(role_id),
    PRIMARY KEY (user_id, role_id)
);

-- 创建角色-权限关联表
CREATE TABLE role_permission_map (
    role_id INT REFERENCES roles(role_id),
    permission_id INT REFERENCES permissions(permission_id),
    PRIMARY KEY (role_id, permission_id)
);

-- 创建用户-角色关联表
CREATE TABLE user_role_map (
    user_id INT REFERENCES users(user_id),
    role_id INT REFERENCES roles(role_id),
    PRIMARY KEY (user_id, role_id)
);

-- 创建应用-角色关联表
CREATE TABLE app_role_map (
    app_id INT REFERENCES applications(app_id),
    role_id INT REFERENCES roles(role_id),
    PRIMARY KEY (app_id, role_id)
);
