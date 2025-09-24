from django.db import migrations

def create_initial_data(apps, schema_editor):
    House = apps.get_model('core', 'House')
    List = apps.get_model('core', 'List')

    if House.objects.exists():
        return

    house = House.objects.create(name='Minha Casa MVP')

    List.objects.create(house=house, name='Mensal')
    List.objects.create(house=house, name='Emergencial')

class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_initial_data),
    ]