--
-- Base de données : `pomme_d_api`
--

-- --------------------------------------------------------

create table products
(
    id          int auto_increment
        primary key,
    name        varchar(255) not null,
    description text         null,
    category    varchar(255) null,
    brand       text         null,
    date_added  datetime     null
);

create table consumed_foods
(
    id                    int auto_increment
        primary key,
    user_id               int           not null,
    product_id            int           not null,
    date_consumed         datetime      not null,
    consumed_quantity_gr  int default 0 not null,
    consumed_quantity_cal int default 0 not null,
    constraint consumed_foods_products_id_fk
        foreign key (product_id) references products (id)
);

create table user
(
    id         int auto_increment
        primary key,
    username   varchar(255) not null,
    password   varchar(255) not null,
    email      varchar(255) not null,
    created_at datetime     not null,
    updated_at datetime     null
);

create table user_favorites
(
    id         int auto_increment
        primary key,
    user_id    int      not null,
    product_id int      not null,
    date_added datetime null,
    constraint user_favorites_products_id_fk
        foreign key (product_id) references products (id)
            on delete cascade,
    constraint user_favorites_user_id_fk
        foreign key (user_id) references user (id)
);

create table user_goals
(
    id          int auto_increment
        primary key,
    user_id     int          not null,
    goals_type  varchar(255) not null,
    goals_value int          not null,
    goals_date  date         null,
    constraint user_goals_user_id_fk
        foreign key (user_id) references user (id)
);

