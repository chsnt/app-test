# app-test

```
npm i
```

DB:
- Install Postgresql 10.13
- Start Postgresql server on 5423 port

Execute SQL code:
```SQL


-- Table: public.EVENTS

-- DROP TABLE public."EVENTS";

CREATE TABLE public."EVENTS"
(
    "ID" integer NOT NULL DEFAULT nextval('"EVENTS_ID_seq"'::regclass),
    "NAME" text COLLATE pg_catalog."default",
    start_date timestamp(6) without time zone,
    end_date timestamp(6) without time zone,
    CONSTRAINT "EVENTS_pkey" PRIMARY KEY ("ID")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."EVENTS"
    OWNER to postgres;
```

Run application
```
npm start
```