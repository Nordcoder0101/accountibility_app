from django.conf.urls import url
from . import views

urlpatterns = [
  url(r'^$', views.index),
  url(r'^/profile$', views.view_profile),
  url(r'^/profile_edit$', views.edit_profile),
  url(r'^/profile_update$', views.profile_update),
  url(r'^/render_agreement$', views.render_agreement),
  url(r'^/add_agreement$', views.add_agreement),
  url(r'^/render_due_date$', views.render_due_date),
  url(r'^/delete/(?P<id>[0-9]+)$', views.delete_agreement),
  url(r'^/is_complete/(?P<id>[0-9]+)$', views.toggle_complete),
  url(r'^/is_not_complete/(?P<id>[0-9]+)$', views.toggle_not_complete),
  

]

