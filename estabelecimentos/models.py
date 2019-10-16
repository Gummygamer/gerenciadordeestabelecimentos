from django.db import models

class Estabelecimento(models.Model):

    nome = models.CharField("Nome", max_length=255)
    endereco = models.CharField("Endereço", max_length=255)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    def __str__(self):
        return self.nome
