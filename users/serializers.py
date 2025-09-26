from rest_framework import serializers
from django.contrib.auth.models import User

class UserRegistrationSerializer(serializers.ModelSerializer):
    # Definimos 'password' como campo de escrita apenas (write_only=True)
    # Isso impede que a senha hasheada seja retornada na resposta.
    password = serializers.CharField(write_only=True)
    
    # O campo de email é essencial para a V2
    email = serializers.EmailField(required=True) 

    class Meta:
        model = User
        # Os campos que o Frontend deve enviar:
        fields = ('id', 'username', 'email', 'password')
        # Regras de validação (ex: campos obrigatórios)
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # A chave para a segurança: usamos create_user para garantir que a senha seja hasheada.
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user