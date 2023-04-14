from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny

from project.global_permissions import IsSameUser
from user.serializers import UserSerializer, UserUpdateSerializer

User = get_user_model()


class ListUserView(ListAPIView):
    """
    get:
    List all users

    # subtitle
    Lists all the users of the Merchant
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [AllowAny]


class SearchUserView(ListAPIView):
    """
    get:
    Search for User

    # subtitle
    Searches for all users of Merchant
    """
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def get_queryset(self):
        # This view returns an item based on the url query param
        queryset = User.objects.all()
        search_value = self.request.query_params.get('search_string')
        if search_value is not None:
            queryset = queryset.filter(
                Q(first_name__icontains=search_value) |
                Q(last_name__icontains=search_value)
            )
        return queryset


class RetrieveUpdateDestroyUserView(RetrieveUpdateDestroyAPIView):
    """
    get:
    Edit and delete functionalities only allowed to authenticated user and company's staff

    # subtitle
    - List the details of a specific user
    - Edit the details of a specific user
    - Delete an existing user
    """
    queryset = User.objects.all()
    permission_classes = [IsSameUser]
    serializer_class = UserSerializer
    lookup_url_kwarg = 'user_id'


class MyUserRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsSameUser]

    def get_object(self):
        return self.request.user

    # Use different serializers for get and patch methods
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return UserSerializer
        elif self.request.method == 'PATCH':
            return UserUpdateSerializer
        return UserSerializer
