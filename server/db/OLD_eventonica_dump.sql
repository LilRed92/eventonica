--
-- PostgreSQL database dump
--

\restrict B784gfzWdZ9IgCf6D2pcWregUteplFgfmqIf6ISWxtEhh49uD71hoW697OFgn6X

-- Dumped from database version 14.20 (Homebrew)
-- Dumped by pg_dump version 14.20 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: eventonica_schema; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA eventonica_schema;


ALTER SCHEMA eventonica_schema OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    category_name character varying(100) NOT NULL,
    emoji character varying(10) DEFAULT '🎉'::character varying NOT NULL,
    color character varying(7) DEFAULT '#3498DB'::character varying NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id integer NOT NULL,
    event_name character varying(255) NOT NULL,
    category integer NOT NULL,
    event_description text NOT NULL,
    start_time timestamp with time zone NOT NULL,
    end_time timestamp with time zone NOT NULL,
    is_favorite boolean DEFAULT false NOT NULL
);


ALTER TABLE public.events OWNER TO postgres;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_id_seq OWNER TO postgres;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, category_name, emoji, color) FROM stdin;
1	Music	🎶	#6200b2
2	Sports	🥅	#fc9f00
3	Games	🎮	#e20000
4	Technology	💻	#0dc200
5	Art	🎨	#ea0075
6	Food & Drink	🍻	#ebf700
7	Networking	👥	#00ddff
8	Other	🎉	#3498DB
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (id, event_name, category, event_description, start_time, end_time, is_favorite) FROM stdin;
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 8, true);


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_id_seq', 1, false);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: idx_event_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_event_name ON public.events USING gin (to_tsvector('english'::regconfig, (event_name)::text));


--
-- Name: idx_events_category; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_events_category ON public.events USING btree (category);


--
-- Name: idx_is_favorite; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_is_favorite ON public.events USING btree (is_favorite);


--
-- Name: idx_start_time; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_start_time ON public.events USING btree (start_time);


--
-- Name: events events_category_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_category_fkey FOREIGN KEY (category) REFERENCES public.categories(id);


--
-- PostgreSQL database dump complete
--

\unrestrict B784gfzWdZ9IgCf6D2pcWregUteplFgfmqIf6ISWxtEhh49uD71hoW697OFgn6X

