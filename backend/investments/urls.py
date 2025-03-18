from django.urls import path
from . import views

app_name = 'investments'

urlpatterns = [
    path('packages/', views.InvestmentPackageList.as_view(), name='package_list'),
    path('create/', views.CreateInvestment.as_view(), name='create_investment'),
    path('my-investments/', views.UserInvestmentList.as_view(), name='user_investments'),
    path('market-data/', views.MarketDataAPI.as_view(), name='market_data'),
]