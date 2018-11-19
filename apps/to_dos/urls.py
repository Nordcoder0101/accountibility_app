from django.conf.urls import url
from . import views

urlpatterns = [
  url(r'^$', views.index),\
  url(r'^/profile$', views.view_profile),
  url(r'^/render_agreement$', views.render_agreement),
  url(r'^/add_agreement$', views.add_profile)

]