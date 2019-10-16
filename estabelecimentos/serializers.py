from rest_framework import serializers
from .models import Estabelecimento

class EstabelecimentoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Estabelecimento 
        fields = ('pk','nome', 'endereco')

