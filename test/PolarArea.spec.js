import { mount } from '@vue/test-utils'
import PolarAreaChart from './examples/PolarAreaChart.vue'

describe('PolarChart', () => {
  const Component = {
    template:
      '<div><PolarAreaChart :chart-id="chartId" :plugins="plugins" /></div>',
    components: { PolarAreaChart },
    props: ['chartId', 'plugins']
  }

  it('should render a canvas', () => {
    const wrapper = mount(Component)

    const polarAreaChartEl = wrapper.find('#polar-chart')
    expect(polarAreaChartEl.element.id).not.toBe('undefined')
    expect(polarAreaChartEl.exists()).toBe(true)

    const canvasEl = wrapper.find('canvas')
    expect(canvasEl.exists()).toBe(true)
  })

  it('should change id based on prop', () => {
    const wrapper = mount(Component, {
      propsData: { chartId: 'polarchartprop' }
    })

    const polarAreaChartEl = wrapper.find('#polarchartprop')
    expect(polarAreaChartEl.element.id).not.toBe('undefined')
    expect(polarAreaChartEl.exists()).toBe(true)
  })

  it('should destroy chart instance', done => {
    const wrapper = mount(Component)
    const { vm } = wrapper

    expect(vm.$children[0].$data._chart.chart.ctx).not.toBe(null)

    vm.$destroy()

    vm.$nextTick(() => {
      vm.$forceUpdate()
      expect(vm.$children[0].$data._chart.chart.ctx).toBe(null)
      done()
    })
  })

  it('should add an inline plugin to the array', () => {
    const testPlugin = {
      id: 'test'
    }

    const wrapper = mount(Component)
    const { vm } = wrapper

    expect(vm.$children[0].$data._plugins).toEqual([])
    vm.$children[0].addPlugin(testPlugin)

    expect(vm.$children[0].$data._plugins.length).toEqual(1)
  })

  it('should add inline plugins based on prop', () => {
    const testPlugin = {
      id: 'test'
    }

    const wrapper = mount(Component, {
      propsData: { plugins: [testPlugin] }
    })
    const { vm } = wrapper

    expect(vm.$children[0].$data._plugins.length).toEqual(1)
  })
})
