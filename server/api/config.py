import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "my_precious_secret_key")
    DEBUG = False


class DevelopmentConfig(Config):
    DEBUG = True
    JSON_AS_ASCII = False
    MAIL_SERVER = "smtp.gmail.com"
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_USERNAME = "anoopprsingh.exp.spam@gmail.com"
    MAIL_DEFAULT_SENDER = MAIL_USERNAME
    MAIL_PASSWORD = "xzjcrdhdlhyyhpdj"
    MAIL_DEBUG = False
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(basedir, "devcard.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class TestingConfig(Config):
    DEBUG = True
    TESTING = True
    JSON_AS_ASCII = False
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(basedir, "devcard.db")
    PRESERVE_CONTEXT_ON_EXCEPTION = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class ProductionConfig(Config):
    DEBUG = False
    JSON_AS_ASCII = False
    # SQLALCHEMY_DATABASE_URI = postgres_local_base


config_by_name = dict(dev=DevelopmentConfig, test=TestingConfig, prod=ProductionConfig)
