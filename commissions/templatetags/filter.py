from django import template

register = template.Library()

@register.filter
def display_as_rupiah(value):
    # Give comma to every 3 digit after the decimal point and replace decimal point as comma
    return 'Rp. {}'.format(format(value, ','))
    
