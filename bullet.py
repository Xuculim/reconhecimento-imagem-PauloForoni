import pygame
from settings import *

class Bullet(pygame.sprite.Sprite):
    def __init__(self, x, y):
        super().__init__()
        # Imagem do tiro (um pequeno retângulo amarelo)
        self.image = pygame.Surface((5, 15))
        self.image.fill(YELLOW)
        self.rect = self.image.get_rect()
        
        # Posição inicial (vem da posição da nave)
        self.rect.bottom = y
        self.rect.centerx = x
        self.speedy = -BULLET_SPEED # Velocidade negativa para subir na tela

    def update(self):
        self.rect.y += self.speedy
        
        # Se o tiro sair do topo da tela, ele é destruído
        if self.rect.bottom < 0:
            self.kill()
